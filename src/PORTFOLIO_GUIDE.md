# 포트폴리오 작업물 추가 가이드

이 문서는 SULAB 포트폴리오 웹사이트의 디자인 작업물 갤러리에 새로운 작업물을 추가하는 방법을 안내합니다.

## 📁 파일 위치

포트폴리오 데이터는 다음 파일에서 관리됩니다:

```
/data/portfolioData.ts
```

## ➕ 새 작업물 추가 방법

### 1단계: 이미지 준비

작업물의 썸네일과 전체 이미지를 준비합니다:

- **썸네일**: 800px 너비 권장 (그리드 뷰용)
- **전체 이미지**: 1920px 너비 권장 (모달 확대 보기용)

### 2단계: 데이터 추가

`/data/portfolioData.ts` 파일을 열고 `portfolioData` 배열에 새로운 객체를 추가합니다:

```typescript
{
  id: "10",                    // 고유 ID (순차적으로 증가)
  title: "프로젝트 제목",       // 작업물 제목
  category: "UI/UX",           // 카테고리 (아래 목록 참조)
  thumbnail: "https://...",    // 썸네일 이미지 URL
  fullImage: "https://...",    // 전체 이미지 URL
  description: "상세 설명",     // 프로젝트 설명
  tags: ["Tag1", "Tag2"],      // 관련 태그들
  date: "2025.01",            // 완료 날짜 (YYYY.MM 형식)
  client: "클라이언트명"       // 클라이언트 (선택사항)
}
```

### 3단계: 카테고리 선택

다음 카테고리 중 하나를 선택해야 합니다:

- `UI/UX` - UI/UX 디자인
- `Branding` - 브랜드 아이덴티티
- `Web Design` - 웹 디자인
- `Graphic Design` - 그래픽 디자인
- `Marketing` - 마케팅 디자인
- `Illustration` - 일러스트레이션

💡 **새 카테고리 추가**
새로운 카테고리를 추가하려면 같은 파일의 `categories` 배열에도 추가해야 합니다:

```typescript
export const categories = [
  "All",
  "UI/UX",
  "Branding",
  "Web Design",
  "Graphic Design",
  "Marketing",
  "Illustration",
  "New Category"  // 새 카테고리 추가
];
```

## 📝 실제 예시

```typescript
{
  id: "10",
  title: "전자상거래 앱 리디자인",
  category: "UI/UX",
  thumbnail: "https://images.unsplash.com/photo-1234567890?w=800&q=80",
  fullImage: "https://images.unsplash.com/photo-1234567890?w=1920&q=80",
  description: "사용자 경험을 향상시킨 모바일 쇼핑 앱 리디자인 프로젝트",
  tags: ["Mobile", "E-Commerce", "User Research"],
  date: "2025.01",
  client: "Shopping Mall Inc."
}
```

## 🖼️ 이미지 소스 권장사항

### Unsplash 사용 (무료 고품질 이미지)
```
https://images.unsplash.com/photo-[ID]?w=800&q=80  // 썸네일
https://images.unsplash.com/photo-[ID]?w=1920&q=80 // 전체 이미지
```

### 자체 서버 이미지 업로드
1. `/public/portfolio/` 폴더에 이미지 저장
2. URL: `/portfolio/project-name-thumb.jpg`

## ✅ 체크리스트

작업물을 추가하기 전에 다음을 확인하세요:

- [ ] 고유한 ID 부여
- [ ] 제목과 설명 작성
- [ ] 적절한 카테고리 선택
- [ ] 썸네일과 전체 이미지 URL 준비
- [ ] 최소 2-3개의 관련 태그 추가
- [ ] 날짜 형식 확인 (YYYY.MM)

## 🔍 작업물 검색 기능

사용자는 다음 방법으로 작업물을 찾을 수 있습니다:

1. **카테고리 필터**: 상단 필터 버튼 사용
2. **검색**: 제목, 설명, 태그로 검색
3. **직접 탐색**: 전체 그리드 뷰 탐색

따라서 검색이 잘 되도록 설명과 태그를 신중하게 작성하세요!

## 🎨 디자인 팁

- **썸네일**: 작업물의 핵심을 잘 보여주는 대표 이미지 선택
- **설명**: 프로젝트의 목표와 결과를 간결하게 설명 (1-2문장)
- **태그**: 기술, 분야, 특징을 나타내는 키워드 선택

## 📞 문제 해결

작업물이 표시되지 않을 때:

1. 브라우저 캐시 삭제 (Ctrl/Cmd + Shift + R)
2. 개발 서버 재시작 (`npm run dev`)
3. 데이터 형식 확인 (JSON 문법 오류)
4. 카테고리 철자 확인

---

더 많은 도움이 필요하시면 [이진수](tel:010-7707-7057)에게 연락하세요.
