# Gemini API 재시도 로직 - 기술 문서

## 📋 개요

`auto_post.js`에 추가된 지수형 백오프(Exponential Backoff) 재시도 로직을 통해 Gemini API의 Rate Limit(429, 503) 에러에 대한 자동 복구 기능을 구현했습니다.

---

## 🔧 구현 세부사항

### 1. 헬퍼 함수: `callGeminiWithRetry`

**위치**: `auto_post.js` 라인 14-45

**함수 시그니처**:
```javascript
async function callGeminiWithRetry(prompt, maxRetries = 3)
```

**파라미터**:
- `prompt` (string): Gemini API에 전달할 프롬프트
- `maxRetries` (number): 최대 재시도 횟수 (기본값: 3)

**반환값**:
- `response`: Gemini API 응답 객체
- `Error`: 재시도 초과 또는 다른 종류의 에러

**동작 흐름**:

```
for (attempt = 0; attempt <= maxRetries; attempt++) {
  try {
    → Gemini API 호출
    → 성공 → response 반환 ✅
  } catch (error) {
    → Rate Limit 에러? 
      ├─ YES & attempt < maxRetries → 지수형 백오프 대기 후 다시 시도
      ├─ YES & attempt >= maxRetries → "API_RETRY_EXHAUSTED" 에러 throw
      └─ NO → 즉시 에러 throw
  }
}
```

### 2. Rate Limit 에러 감지

다음의 조건 중 하나에 해당하면 Rate Limit 에러로 판단:

```javascript
const isRateLimitError = 
  statusCode === 429 ||                    // Too Many Requests
  statusCode === 503 ||                    // Service Unavailable
  error.message?.includes('429') ||
  error.message?.includes('503') ||
  error.message?.includes('RESOURCE_EXHAUSTED') ||  // Gemini 특정
  error.message?.includes('quota');        // 할당량 초과
```

### 3. 지수형 백오프 구현

```javascript
const backoffDelays = [30000, 60000, 120000]; // ms 단위
// 1차 재시도 전: 30초 대기
// 2차 재시도 전: 60초 대기
// 3차 재시도 전: 120초 대기
```

**타이밍 차트**:
```
시간 ─────────────────────────────────────────────────────────
│
0초  ├─ API 호출 ①
     │
     ├─ (실패) Rate Limit 감지
     │
30초 ├─ API 호출 ②
     │
     ├─ (실패) Rate Limit 감지
     │
90초 ├─ API 호출 ③
     │
     ├─ (실패) Rate Limit 감지
     │
210초 ├─ API 호출 ④
      │
      ├─ (실패) → ❌ 최대 재시도 횟수 초과
      │         → throw Error('API_RETRY_EXHAUSTED')
```

### 4. 호출 위치 변경

**Before** (라인 237-244 원본):
```javascript
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: prompt,
  config: {
    tools: [{ googleSearch: {} }],
  },
});
```

**After** (라인 244 수정):
```javascript
const response = await callGeminiWithRetry(prompt, 3);
```

### 5. 에러 처리 강화

#### `generateContent` 함수의 catch 블록 (라인 293-301)

```javascript
catch (error) {
  // API 재시도 초과 에러 특별 처리
  if (error.message?.includes('API_RETRY_EXHAUSTED')) {
    console.error('🚨 Gemini API 최대 재시도 횟수 초과. 이번 스케줄 발행을 스킵합니다.');
    return null; // null 반환하여 caller에게 신호
  }
  console.error('콘텐츠 생성 실패:', error);
  throw error; // 다른 에러는 즉시 throw
}
```

#### `main` 함수의 null 체크 (라인 386-389)

```javascript
const newContent = await generateContent(program, sourceContent);

// generateContent가 null을 반환한 경우 안전한 스킵
if (!newContent) {
  console.log('📌 콘텐츠 생성 불가로 인해 이번 스케줄을 스킵합니다. 💤');
  return; // 안전하게 종료, 에러 발생 없음
}
```

---

## 📊 재시도 시뮬레이션

### 시나리오 1: 첫 시도 성공

```
attempt = 0
  ├─ API 호출 성공
  └─ response 반환 ✅
  
총 소요 시간: 2-3초 (API 응답 시간만)
```

### 시나리오 2: 1차 재시도에서 성공

```
attempt = 0
  ├─ API 호출 → 429 에러
  └─ Rate Limit 감지
  
attempt = 1
  ├─ 30초 대기 ⏳
  ├─ API 호출 성공
  └─ response 반환 ✅

총 소요 시간: ~33초
```

### 시나리오 3: 2차 재시도에서 성공

```
attempt = 0
  ├─ API 호출 → 429 에러
  ├─ Rate Limit 감지
  
attempt = 1
  ├─ 30초 대기 ⏳
  ├─ API 호출 → 429 에러
  ├─ Rate Limit 감지
  
attempt = 2
  ├─ 60초 대기 ⏳
  ├─ API 호출 성공
  └─ response 반환 ✅

총 소요 시간: ~95초
```

### 시나리오 4: 모든 재시도 실패

```
attempt = 0
  ├─ API 호출 → 429 에러
  
attempt = 1
  ├─ 30초 대기 ⏳
  ├─ API 호출 → 429 에러
  
attempt = 2
  ├─ 60초 대기 ⏳
  ├─ API 호출 → 429 에러
  
attempt = 3
  ├─ 120초 대기 ⏳
  ├─ API 호출 → 429 에러
  ├─ attempt >= maxRetries 확인
  └─ throw Error('API_RETRY_EXHAUSTED') ❌

총 소요 시간: ~213초 (~3분 33초)
  → 🚨 Gemini API 최대 재시도 횟수 초과. 이번 스케줄 발행을 스킵합니다.
  → 📌 콘텐츠 생성 불가로 인해 이번 스케줄을 스킵합니다. 💤
  → 스크립트 정상 종료 (에러 없음)
```

---

## 🔍 로그 분석

### 성공 케이스

```
✍️ '근로장려금' 콘텐츠 생성 중 (Google Search Grounding)...
✅ 출처 페이지 로드 성공 (4821자)
💾 Blogger(블로그 ID: xyz)에 포스팅 중...
⚠️ 콘텐츠 품질 검증 중...
✅ 구글 블로그 발행 성공! 글 확인: https://...
🚀 파이프라인 실행 완료!
```

### Rate Limit 재시도 + 최종 성공 케이스

```
✍️ '소상공인 경영안정자금' 콘텐츠 생성 중 (Google Search Grounding)...
⚠️ API 과부하 (상태: 429). 30초 후 1차 재시도합니다...
⚠️ API 과부하 (상태: 429). 60초 후 2차 재시도합니다...
✅ 출처 페이지 로드 성공 (5234자)
💾 Blogger(블로그 ID: xyz)에 포스팅 중...
✅ 구글 블로그 발행 성공!
🚀 파이프라인 실행 완료!
```

### Rate Limit 재시도 + 최종 실패 케이스

```
✍️ '근로장려금' 콘텐츠 생성 중 (Google Search Grounding)...
⚠️ API 과부하 (상태: 429). 30초 후 1차 재시도합니다...
⚠️ API 과부하 (상태: 429). 60초 후 2차 재시도합니다...
⚠️ API 과부하 (상태: 429). 120초 후 3차 재시도합니다...
❌ API 과부하로 인해 최대 재시도 횟수(3)를 초과했습니다. 발행을 스킵합니다.
🚨 Gemini API 최대 재시도 횟수 초과. 이번 스케줄 발행을 스킵합니다.
📌 콘텐츠 생성 불가로 인해 이번 스케줄을 스킵합니다. 💤
```

---

## 🎯 설계 원칙

### 1. 점진적 대기 시간 증가
- 1차: 30초 (빠른 복구 시도)
- 2차: 60초 (API 서버 여유 시간 제공)
- 3차: 120초 (충분한 대기 시간)

**이유**: API 과부하는 시간이 지나면서 자연스럽게 완화됨

### 2. 최대 3회 재시도
- 총 소요 시간: ~213초 (~3분 33초)
- GitHub Actions 타임아웃(기본 6시간): 여유 충분

**이유**: 과도한 재시도는 오히려 서버 부하 증가

### 3. Rate Limit만 재시도
- 다른 에러(인증, 400, 500 등)는 즉시 실패
- 일시적 문제만 대응

**이유**: 근본적 문제를 재시도로 해결 불가능

### 4. 안전한 스킵 처리
- 재시도 초과 시에도 스크립트 충돌 없음
- 명확한 로그로 상황 파악 가능

**이유**: CI/CD 파이프라인의 안정성 확보

---

## 🧪 테스트 체크리스트

### Unit 테스트 (로컬)

- [ ] `callGeminiWithRetry` 함수 정상 호출 확인
- [ ] 429 에러 감지 확인
- [ ] 503 에러 감지 확인
- [ ] 지수형 백오프 타이밍 확인 (로그 기반)
- [ ] 3회 재시도 후 에러 throw 확인
- [ ] 비-Rate Limit 에러 즉시 throw 확인

### Integration 테스트 (GitHub Actions)

- [ ] 정상 실행 → 블로그 발행 완료
- [ ] 일시적 API 오류 → 자동 재시도 후 발행
- [ ] 지속적 API 오류 → 안전한 스킵

---

## 📈 성능 영향

| 케이스 | 추가 지연 시간 |
|--------|-------------|
| 정상 실행 | 0초 (오버헤드 무시할 수준) |
| 1회 재시도 | +30초 |
| 2회 재시도 | +90초 |
| 3회 재시도 | +210초 (~3분 30초) |

**GitHub Actions 기본 타임아웃**: 6시간  
**영향도**: 최악의 경우에도 3분 30초이므로 무시할 수 있는 수준

---

## 🔒 보안 고려사항

- ✅ API 키는 환경변수로 관리 (`.env` 파일)
- ✅ 에러 메시지에 민감한 정보 노출 안 함
- ✅ 재시도 로직은 공개 Gemini API만 사용
- ✅ 사용자 프롬프트는 검증되지 않음 (내부 사용만)

---

## 📚 참고 자료

**Gemini API 공식 문서**:
- https://ai.google.dev/gemini-api/docs/google-search
- https://ai.google.dev/gemini-api/docs/error-handling

**HTTP 상태 코드**:
- 429 Too Many Requests: https://httpwg.org/specs/rfc9110.html#status.429
- 503 Service Unavailable: https://httpwg.org/specs/rfc9110.html#status.503

**지수형 백오프 개념**:
- https://en.wikipedia.org/wiki/Exponential_backoff

---

**최종 수정**: 2026-05-18  
**파일**: `auto_post.js` 라인 14-45, 244, 293-301, 386-389
