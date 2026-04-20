// 기존: export const DesignPixelHomePage = () => { ... }
// 변경: 
export const DesignPixelHomePage = ({ data }: { data: any }) => {
  return (
    <div>
      {/* 1. 메인 타이틀 연결 */}
      <h1>{data.content.heroTitle}</h1>
      
      {/* 2. 서브 타이틀 연결 */}
      <p>{data.content.heroSubtitle}</p>

      {/* 3. 서비스/특징 리스트 연결 (반복문) */}
      {data.content.features.map((item: any, index: number) => (
        <div key={index}>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};
import { HorizontalSlideLayout } from "../components/designpixel/HorizontalSlideLayout";

export function DesignPixelHomePage() {
  return <HorizontalSlideLayout />;
}
