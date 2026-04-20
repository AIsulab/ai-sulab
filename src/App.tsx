// 1. JSON 파일 임포트
import siteConfig from '../site.config.json'; 

// 2. 컴포넌트 내부에서 사용 예시
const HeroSection = () => {
  return (
    <section>
      {/* 이제 텍스트를 직접 안 쓰고 JSON에서 가져옵니다 */}
      <h1>{siteConfig.content.heroTitle}</h1>
      <p>{siteConfig.content.heroSubtitle}</p>
    </section>
  );
};
import { useEffect, useState } from "react";
import { DesignPixelHomePage } from "./pages/DesignPixelHomePage";
import { OverviewPage } from "./pages/OverviewPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { MobilePage } from "./pages/MobilePage";
import { CIBIPage } from "./pages/CIBIPage";
import { RequestPage } from "./pages/RequestPage";
import { ContactPage } from "./pages/ContactPage";
import { NoticePage } from "./pages/NoticePage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "/";
      setCurrentPage(hash);
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "/":
        return <DesignPixelHomePage />;
      case "/overview":
        return <OverviewPage />;
      case "/portfolio":
        return <PortfolioPage />;
      case "/mobile":
        return <MobilePage />;
      case "/cibi":
        return <CIBIPage />;
      case "/request":
        return <RequestPage />;
      case "/contact":
        return <ContactPage />;
      case "/notice":
        return <NoticePage />;
      default:
        return <DesignPixelHomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-black antialiased">
      {renderPage()}
    </div>
  );
}
