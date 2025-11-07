# SULAB Website Structure

## 📐 DesignPixel-Style Multi-Page Website

완벽한 DesignPixel 스타일로 재구축된 SULAB 웹사이트입니다.

---

## 🎯 페이지 구조

### 1. **홈페이지** (`/`)
- 풀스크린 비디오 히어로
- 스크롤 기반 섹션 전환 (Web Development → Mobile Apps → Brand Identity)
- CTA 섹션

### 2. **회사 소개** (`/overview`)
- 회사 비전 & 미션
- 통계 섹션 (100+ 프로젝트, 50+ 고객)
- 핵심 가치 (4개 카드)
- CTA: 프로젝트 의뢰 & 문의

### 3. **웹 포트폴리오** (`/portfolio`)
- 6개 웹 프로젝트 갤러리
- PortfolioCard 컴포넌트 활용
- Hover 시 이미지 확대 & 텍스트 애니메이션

### 4. **모바일 포트폴리오** (`/mobile`)
- 4개 모바일 앱 프로젝트
- 기술 스택 섹션 (React Native, Swift, Firebase 등)
- 기능 태그 (Native iOS/Android, 푸시 알림 등)

### 5. **CI/BI 포트폴리오** (`/cibi`)
- 4개 브랜딩 프로젝트
- 제공 서비스 (로고, 가이드라인, 인쇄물, 디지털 에셋)
- 디자인 프로세스 (01~04 단계)

### 6. **프로젝트 의뢰** (`/request`)
- 실제 작동하는 폼
- 필드: 이름, 이메일, 연락처, 회사명, 프로젝트 유형, 예산, 일정, 설명
- Submit 시 애니메이션 (전송 완료 체크)

### 7. **문의하기** (`/contact`)
- 4개 연락처 카드 (이메일, 전화, 주소, 운영시간)
- 빠른 상담 CTA
- 찾아오시는 길 (Map Placeholder)
- FAQ 섹션

### 8. **공지사항** (`/notice`)
- 4개 공지 항목 (idx 1517~1520)
- 아코디언 스타일 (클릭 시 펼쳐짐)
- 카테고리, 날짜, 조회수 표시
- 페이지네이션

---

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary Gold**: `#CBA135` (Accent, Hover, Active)
- **Black**: `#000000` (Background)
- **White**: `#FFFFFF` (Text, Borders)
- **Gray Scale**: `rgba(255,255,255,0.1~0.8)` (투명도)

### 타이포그래피
- **Heading 1**: 3~6rem, 700 weight, 0.02em letter-spacing
- **Heading 2**: 2.5~3.5rem, 700 weight
- **Body**: 0.9375~1.125rem, 400 weight, 1.7~1.8 line-height
- **Label**: 0.75~0.875rem, 600 weight, 0.1~0.2em letter-spacing

### 모션
- **Easing**: `cubic-bezier(0.8, 0, 0.2, 1)`
- **Duration**: 0.3s (fast), 0.8s (medium), 1.2s (slow)
- **Scroll Offset**: `["start start", "end start"]`
- **Opacity Curves**: `[0, 0.3, 0.7, 1] → [0, 1, 1, 0]`

---

## 🧩 컴포넌트

### Shared Components
```
/components/shared/
├── DesignPixelHeader.tsx    # 네비게이션 + 풀스크린 메뉴
├── DesignPixelFooter.tsx    # Footer (링크, SNS, 정보)
└── PortfolioCard.tsx        # 포트폴리오 카드 (hover 애니메이션)
```

### Pages
```
/pages/
├── HomePage.tsx             # 홈 (스크롤 섹션)
├── OverviewPage.tsx         # 회사 소개
├── PortfolioPage.tsx        # 웹 포트폴리오
├── MobilePage.tsx           # 모바일 포트폴리오
├── CIBIPage.tsx             # CI/BI 포트폴리오
├── RequestPage.tsx          # 프로젝트 의뢰 폼
├── ContactPage.tsx          # 문의하기
└── NoticePage.tsx           # 공지사항
```

---

## 🔗 라우팅

### Hash-Based Routing
```javascript
window.location.hash = "/overview"  // 페이지 이동
```

### 네비게이션 메뉴
- Home → `/`
- Overview → `/overview`
- Portfolio → `/portfolio`
- Mobile → `/mobile`
- CI/BI → `/cibi`
- Request → `/request`
- Contact → `/contact`
- Notice → `/notice`

---

## 📱 반응형 그리드

### Breakpoints
- **Desktop**: 1440px (12-column grid)
- **Tablet**: 768px (8-column grid)
- **Mobile**: 390px (4-column grid)

### Container
```css
max-width: 1440px (7xl)
padding: 48px (lg:px-12)
```

---

## ✨ 인터랙션

### Header
- 스크롤 진행률 바 (하단 1px)
- 우측 섹션 인디케이터 (01~05)
- 풀스크린 메뉴 (애니메이션)
- Mix-blend-difference (항상 보임)

### Portfolio Cards
- Hover 시 이미지 scale(1.08)
- 텍스트 y축 슬라이드 (-5px)
- 하단 라인 scaleX(0.3 → 1)
- Glow 효과 (금색 그라데이션)

### Forms
- Focus 시 border → `#CBA135`
- Submit 시 체크 애니메이션
- 3초 후 자동 리셋

### Scroll Sections (HomePage)
- Sticky positioning
- Parallax scroll (opacity + scale)
- 200vh height (longer scroll)

---

## 🎬 애니메이션 구현

### Framer Motion
```tsx
import { motion, useScroll, useTransform } from "motion/react";

const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"],
});

const opacity = useTransform(
  scrollYProgress,
  [0, 0.3, 0.7, 1],
  [0, 1, 1, 0]
);
```

---

## 📦 배포

### Vercel
- GitHub Repo: `https://github.com/AISulab/Sulab`
- Deploy URL: `https://sulab.vercel.app`

### 커밋 메시지
```bash
[Figma AI] DesignPixel-Style Multi-Page Website
```

---

## 🎯 핵심 특징

✅ **완벽한 DesignPixel 복제**
- 블랙 배경 + 화이트 라인
- 미니멀 타이포그래피
- 스크롤 기반 전환

✅ **8개 완성된 페이지**
- 각 페이지 고유 레이아웃
- 일관된 디자인 시스템

✅ **실제 작동하는 인터랙션**
- 폼 제출
- 네비게이션
- 아코디언
- 페이지네이션

✅ **완전 반응형**
- Desktop / Tablet / Mobile
- 12-column grid system

✅ **Framer Motion 애니메이션**
- 스크롤 트리거
- 페이지 전환
- Hover 효과

---

Made with 💛 by SULAB
