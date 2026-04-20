import { useEffect, useState } from "react";
import { DesignPixelHomePage } from "./pages/DesignPixelHomePage";
import { OverviewPage } from "./pages/OverviewPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { MobilePage } from "./pages/MobilePage";
import { CIBIPage } from "./pages/CIBIPage";
import { RequestPage } from "./pages/RequestPage";
import { ContactPage } from "./pages/ContactPage";
import { NoticePage } from "./pages/NoticePage";
// JSON 파일을 불러옵니다
import siteConfig from '../site.config.json';

export default function App() {
  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "/";
      setCurrentPage(hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // 여기서 JSON 데이터를 하위 페이지로 전달할 준비가 끝났습니다.
  const renderPage = () => {
    switch (currentPage) {
      case "/":
        // 메인 페이지에 JSON 데이터를 전달합니다
        return <DesignPixelHomePage data={siteConfig} />;
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
        return <DesignPixelHomePage data={siteConfig} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderPage()}
    </div>
  );
}
