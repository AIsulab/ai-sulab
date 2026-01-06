// 포트폴리오 작업물 데이터
// 새로운 작업물을 추가하려면 이 파일의 portfolioData 배열에 항목을 추가하세요.

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  fullImage: string;
  description: string;
  tags: string[];
  date: string;
  client?: string;
}

export const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    title: "브랜드 아이덴티티 디자인",
    category: "Branding",
    thumbnail: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80",
    fullImage: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=1920&q=80",
    description: "스타트업을 위한 완전한 브랜드 아이덴티티 시스템 구축",
    tags: ["Logo", "Brand Guide", "Color System"],
    date: "2024.12",
    client: "Tech Startup Co.",
  },
  {
    id: "2",
    title: "모바일 앱 UI/UX 디자인",
    category: "UI/UX",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
    fullImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80",
    description: "사용자 중심의 직관적인 모바일 앱 인터페이스 디자인",
    tags: ["Mobile", "UX Design", "Prototyping"],
    date: "2024.11",
    client: "E-Commerce Platform",
  },
  {
    id: "3",
    title: "웹사이트 리디자인",
    category: "Web Design",
    thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    fullImage: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1920&q=80",
    description: "기업 웹사이트의 현대적 리뉴얼 및 사용성 개선",
    tags: ["Responsive", "Modern Design", "UX"],
    date: "2024.10",
    client: "Global Enterprise",
  },
  {
    id: "4",
    title: "패키지 디자인",
    category: "Graphic Design",
    thumbnail: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=800&q=80",
    fullImage: "https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=1920&q=80",
    description: "친환경 제품을 위한 창의적인 패키지 디자인",
    tags: ["Packaging", "Print", "Sustainable"],
    date: "2024.09",
    client: "Eco Brand",
  },
  {
    id: "5",
    title: "대시보드 UI 디자인",
    category: "UI/UX",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    fullImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
    description: "데이터 시각화와 사용자 경험을 고려한 대시보드 디자인",
    tags: ["Dashboard", "Data Viz", "SaaS"],
    date: "2024.08",
    client: "Analytics Company",
  },
  {
    id: "6",
    title: "소셜 미디어 캠페인",
    category: "Marketing",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    fullImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80",
    description: "브랜드 인지도 향상을 위한 소셜 미디어 비주얼 디자인",
    tags: ["Social Media", "Campaign", "Visual Design"],
    date: "2024.07",
    client: "Fashion Brand",
  },
  {
    id: "7",
    title: "일러스트레이션 시리즈",
    category: "Illustration",
    thumbnail: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&q=80",
    fullImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=1920&q=80",
    description: "브랜드 스토리텔링을 위한 커스텀 일러스트레이션",
    tags: ["Illustration", "Character Design", "Storytelling"],
    date: "2024.06",
    client: "Education Platform",
  },
  {
    id: "8",
    title: "명함 & 스테이셔너리",
    category: "Branding",
    thumbnail: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
    fullImage: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=1920&q=80",
    description: "기업 아이덴티티를 담은 명함 및 각종 스테이셔너리 디자인",
    tags: ["Print Design", "Brand Identity", "Stationery"],
    date: "2024.05",
    client: "Law Firm",
  },
  {
    id: "9",
    title: "랜딩 페이지 디자인",
    category: "Web Design",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    fullImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80",
    description: "전환율 최적화를 고려한 랜딩 페이지 디자인",
    tags: ["Landing Page", "Conversion", "Marketing"],
    date: "2024.04",
    client: "SaaS Startup",
  },
];

// 카테고리 목록
export const categories = [
  "All",
  "UI/UX",
  "Branding",
  "Web Design",
  "Graphic Design",
  "Marketing",
  "Illustration"
];

/*
 * 새 작업물 추가 방법:
 * 
 * 1. portfolioData 배열에 새로운 객체를 추가합니다.
 * 2. 고유한 id를 부여합니다.
 * 3. 이미지는 Unsplash나 자체 서버의 URL을 사용합니다.
 * 4. category는 반드시 categories 배열에 있는 값 중 하나여야 합니다.
 * 
 * 예시:
 * {
 *   id: "10",
 *   title: "새로운 프로젝트",
 *   category: "UI/UX",
 *   thumbnail: "https://...",
 *   fullImage: "https://...",
 *   description: "프로젝트 설명",
 *   tags: ["Tag1", "Tag2", "Tag3"],
 *   date: "2025.01",
 *   client: "클라이언트명" // 선택사항
 * }
 */
