import { HorizontalSlideLayout } from "../components/designpixel/HorizontalSlideLayout";

// data를 받아서 실제 디자인 컴포넌트인 HorizontalSlideLayout에 전달합니다.
export function DesignPixelHomePage({ data }: { data: any }) {
  return <HorizontalSlideLayout data={data} />;
}
