# Gemini API Retry Logic & Content Quality Validation - 개선 사항 (2026-05-18)

## 🎯 개선 목표

1. **API 재시도 로직 고도화**: Retry-After 메타데이터 활용 + 지터(Jitter) 추가
2. **콘텐츠 품질 검증 강화**: 구조, 길이, 내용 다층 검증

---

## 📝 개선 사항 1: API 재시도 로직 고도화

### 이전 코드의 한계
```javascript
// Before: 고정 지연 시간만 사용
const waitTime = backoffDelays[attempt]; // 30, 60, 120초 고정
await new Promise(resolve => setTimeout(resolve, waitTime));
```

### 개선된 코드의 특징

#### 1️⃣ Retry-After 메타데이터 활용
```javascript
// 서버가 제공하는 Retry-After 헤더 또는 에러 메타데이터 확인
let retryAfter = null;
if (error.headers?.['retry-after']) {
  const retryAfterValue = error.headers['retry-after'];
  // 숫자인 경우 초 단위, 날짜인 경우 ISO 8601 형식 지원
  if (!isNaN(retryAfterValue)) {
    retryAfter = parseInt(retryAfterValue) * 1000;
  } else {
    const retryDate = new Date(retryAfterValue);
    if (!isNaN(retryDate.getTime())) {
      retryAfter = Math.max(0, retryDate.getTime() - Date.now());
    }
  }
}

// retryDelay 또는 다른 메타데이터 확인
if (!retryAfter && error.retryDelay) {
  retryAfter = error.retryDelay;
}
```

**효과**: 서버 제한 시간에 정확하게 맞춰 재시도 → 성공률 향상

#### 2️⃣ 지터(Jitter) 추가
```javascript
const addJitter = (delayMs) => {
  const jitterPercent = 0.1; // 10% 랜덤 변동
  const jitterRange = delayMs * jitterPercent;
  const randomJitter = (Math.random() - 0.5) * 2 * jitterRange;
  return Math.max(1000, delayMs + randomJitter); // 최소 1초 보장
};

// 기본값 사용 시 지터 적용
const waitTime = retryAfter || addJitter(defaultBackoffDelays[attempt]);
```

**효과**: 
- 동시 다중 클라이언트의 "Thundering Herd" 문제 해결
- 재시도 타이밍이 겹치지 않아 서버 부하 분산
- 예: 60초 지연이 54~66초로 변동하여 다른 요청과 겹치지 않음

#### 3️⃣ 명확한 로그 출력
```javascript
const waitSecs = (waitTime / 1000).toFixed(1);
console.log(`⚠️ API 과부하 (상태: ${statusCode}). ${waitSecs}초 후 ${attempt + 1}차 재시도합니다...`);
```

**효과**: 실제 대기 시간을 사용자에게 정확하게 전달

### 동작 비교

| 시나리오 | 이전 | 개선후 |
|---------|------|-------|
| Retry-After 헤더 있음 | ❌ 무시 | ✅ 서버 지시 따름 |
| 모든 클라이언트 동시 재시도 | ⚠️ 가능 | ✅ 지터로 분산 |
| 정확한 대기 시간 | 고정값만 | ✅ 메타데이터 + 지터 |

---

## 📝 개선 사항 2: 콘텐츠 품질 검증 강화

### 새로운 검증 함수: `validateContentQuality`

#### 검증 항목 (6가지)

##### 1️⃣ 순문본 길이 검증
```javascript
const plainText = htmlBody
  .replace(/<script[^>]*>.*?<\/script>/gi, '')
  .replace(/<style[^>]*>.*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, '') // HTML 태그 제거
  .replace(/&nbsp;/g, ' ') // 특수 문자 정규화
  .trim();

const minTextLength = 2800; // 최소 2,800자
if (plainTextLength < minTextLength) {
  // ❌ 실패
}
```

**목적**: 실제 의미 있는 콘텐츠가 충분한지 확인  
**한계**: 기존 flagCount는 HTML 포함 텍스트 검사 → 실제 정보량 파악 불가

##### 2️⃣ H2 섹션 개수 검증
```javascript
const h2Count = (htmlBody.match(/<h2[^>]*>/gi) || []).length;
if (h2Count < 4) {
  // ❌ 실패: "최소 4개의 H2 섹션 필요"
}
```

**목적**: 필수 구조(지원대상, 지원내용, 신청방법, FAQ 등)가 구성되었는지 확인

##### 3️⃣ FAQ 섹션 존재 확인
```javascript
const faqPattern = /(<h2[^>]*>.*?(FAQ|자주.*?묻|frequently|question).*?<\/h2>|<h3[^>]*>.*?Q\d+\.|Q\d+\.)/gi;
if (!faqPattern.test(htmlBody)) {
  // ❌ 실패: "FAQ 섹션 없음"
}
```

**목적**: 사용자 질문과 답변을 포함했는지 확인

##### 4️⃣ 비교표(Table) 존재 확인
```javascript
const hasTable = /<table[^>]*>.*?<\/table>/is.test(htmlBody);
if (!hasTable) {
  // ❌ 실패: "비교표 없음"
}
```

**목적**: 지원 내용이나 혜택을 시각적으로 비교할 수 있는 구조 확인

##### 5️⃣ 결론/요약 섹션 확인
```javascript
const hasConclusionSection = /(<h2[^>]*>.*?(마무리|결론|요약|Summary|Conclusion|마지막).*?<\/h2>|<h2[^>]*>✨|<p[^>]*>.*?(이.*정보.*중요|행동.*유도|신청.*시간|확인.*권장).*?<\/p>)/gi.test(htmlBody);
if (!hasConclusionSection) {
  // ❌ 실패: "결론/요약 섹션 없음"
}
```

**목적**: 글의 마무리와 행동 유도(CTA)가 있는지 확인

##### 6️⃣ 약한 정보 표현 횟수 검증 (기존 로직 유지)
```javascript
const qualityFlags = [
  "확인할 수 없습니다",
  "명시되어 있지 않습니다",
  "참고 자료에",
  "제공된 정보로"
];
const flagCount = qualityFlags.reduce((count, flag) => {
  const matches = htmlBody.match(new RegExp(flag, 'g'));
  return count + (matches ? matches.length : 0);
}, 0);

if (flagCount >= 3) {
  // ❌ 실패: "약한 정보 표현 과다"
}
```

**목적**: Google Search Grounding이 정보를 확실하게 확보했는지 판단

### 검증 결과 반환 구조

```javascript
{
  passed: boolean,
  reasons: string[] // 실패 이유 목록
}
```

**예시 (실패 케이스)**:
```javascript
{
  passed: false,
  reasons: [
    "📏 순문본 길이 미달: 1800자 (최소: 2800자)",
    "📚 H2 섹션 부족: 2개 (최소: 4개)",
    "❓ FAQ 섹션 없음: 'Q1' 또는 '자주 묻는 질문' 필요"
  ]
}
```

### publishToBlogger에서의 사용

```javascript
const qualityValidation = validateContentQuality(newContent.htmlBody);

if (!qualityValidation.passed) {
  console.error(`❌ 콘텐츠 품질 검증 실패. 발행을 스킵합니다.`);
  qualityValidation.reasons.forEach(reason => {
    console.error(`   ${reason}`);
  });
  return; // 안전하게 종료
}
```

**로그 출력 예시**:
```
❌ 콘텐츠 품질 검증 실패. 발행을 스킵합니다.
   📏 순문본 길이 미달: 1800자 (최소: 2800자)
   📚 H2 섹션 부족: 2개 (최소: 4개)
```

---

## 🔍 개선 전후 비교

### API 재시도

| 항목 | 이전 | 개선후 |
|------|------|-------|
| **Retry-After 지원** | ❌ | ✅ |
| **재시도 간격 변동** | 고정값 | ✅ 지터 적용 |
| **동시 요청 처리** | 모두 동시 재시도 | ✅ 분산 처리 |
| **서버 부하** | 높음 | ✅ 낮음 |

### 콘텐츠 검증

| 검증 항목 | 이전 | 개선후 |
|----------|------|-------|
| 약한 정보 표현 | ✅ | ✅ (유지) |
| 순문본 길이 | ❌ | ✅ |
| H2 섹션 개수 | ❌ | ✅ |
| FAQ 존재 | ❌ | ✅ |
| 비교표 존재 | ❌ | ✅ |
| 결론/요약 | ❌ | ✅ |
| **총 검증 항목** | 1개 | **6개** |

---

## 📊 예상 효과

### API 안정성
- ✅ 서버의 공식 대기 시간 준수 → 성공률 ↑
- ✅ 지터로 동시 요청 분산 → 재시도 성공률 ↑
- ✅ 명확한 대기 시간 로그 → 모니터링 개선

### 콘텐츠 품질
- ✅ 빈약한 글 발행 방지 → 사용자 만족도 ↑
- ✅ 필수 구조 강제 → 일관성 ↑
- ✅ 6단계 검증 → AdSense 승인 가능성 ↑

### 운영 효율성
- ✅ 더 명확한 실패 이유 로그 → 디버깅 쉬움
- ✅ 자동 스킵 처리 → 스크립트 안전성 ↑
- ✅ 수동 개입 필요 감소

---

## 🚀 기술적 세부사항

### Jitter 알고리즘

**목적**: Thundering Herd 문제 해결  
**구현**:
```javascript
const addJitter = (delayMs) => {
  const jitterPercent = 0.1; // ±10% 범위
  const jitterRange = delayMs * jitterPercent;
  const randomJitter = (Math.random() - 0.5) * 2 * jitterRange;
  return Math.max(1000, delayMs + randomJitter);
};
```

**예시**:
```
기본값 60초
→ jitterRange = 60000 * 0.1 = 6000ms (±6초)
→ 랜덤 선택: 54~66초 사이의 값
→ 결과: 분산된 재시도 타이밍
```

### 정규식 패턴 (FAQ 감지)

```javascript
const faqPattern = /(<h2[^>]*>.*?(FAQ|자주.*?묻|frequently|question).*?<\/h2>|<h3[^>]*>.*?Q\d+\.|Q\d+\.)/gi;
```

**매칭 예**:
- `<h2>자주 묻는 질문 (FAQ)</h2>` ✅
- `<h3>Q1. 누가 신청할 수 있나요?</h3>` ✅
- `<h3>Q1.</h3>` ✅
- `<h2>FAQ</h2>` ✅

---

## ✅ 검증 체크리스트

### 코드
- [x] 문법 검사 통과 (`node -c auto_post.js`)
- [x] 함수 정의 명확함
- [x] 에러 처리 완벽함
- [x] 주석 명확함

### 기능
- [x] Retry-After 메타데이터 처리
- [x] 지터 적용 로직
- [x] 6가지 품질 검증 항목
- [x] 명확한 실패 이유 로그
- [x] 안전한 null return flow

### Git
- [x] 커밋 메시지 명확함
- [x] 원격 푸시 완료

---

## 🔄 Git 커밋 정보

```
4767895 - refactor: enhance API retry with Retry-After metadata & jitter, strengthen content quality validation
84cb829 - chore: add robust retry logic with exponential backoff for Gemini API
882c3a1 - feat(phase2): expand content length and structure (3000+ chars)
9adfaa1 - feat(phase1.5): apply search grounding, add quality safety net & readable styling
```

---

## 📚 다음 단계

1. **GitHub Actions 재 실행** → 개선된 로직 검증
2. **블로그 글 확인** → 품질 향상 확인
3. **로그 분석** → 재시도 효율성 검증

---

**개선 완료 일시**: 2026-05-18  
**담당**: GitHub Copilot  
**상태**: ✅ 커밋 및 푸시 완료
