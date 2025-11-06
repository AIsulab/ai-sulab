import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "figma:asset/abf9816ebaecbe448905f80cd9fb228c25413530.png";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 group transition-transform hover:scale-105"
          >
            <img src={logo} alt="SULAB" className="h-10 w-auto" />
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("features")}
              className={`transition-colors ${
                isScrolled ? "text-gray-700 hover:text-[#2E6EFF]" : "text-white hover:text-blue-200"
              }`}
              style={{ fontWeight: 500 }}
            >
              기능
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className={`transition-colors ${
                isScrolled ? "text-gray-700 hover:text-[#2E6EFF]" : "text-white hover:text-blue-200"
              }`}
              style={{ fontWeight: 500 }}
            >
              데모
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className={`transition-colors ${
                isScrolled ? "text-gray-700 hover:text-[#2E6EFF]" : "text-white hover:text-blue-200"
              }`}
              style={{ fontWeight: 500 }}
            >
              요금제
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className={`transition-colors ${
                isScrolled ? "text-gray-700 hover:text-[#2E6EFF]" : "text-white hover:text-blue-200"
              }`}
              style={{ fontWeight: 500 }}
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("hero")}
              className="px-6 py-2.5 bg-[#2E6EFF] text-white rounded-xl hover:bg-[#1e5eff] transition-all hover:scale-105 shadow-md"
              style={{ fontWeight: 600 }}
            >
              시작하기
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${isScrolled ? "text-gray-700" : "text-white"}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              style={{ fontWeight: 500 }}
            >
              기능
            </button>
            <button
              onClick={() => scrollToSection("demo")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              style={{ fontWeight: 500 }}
            >
              데모
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              style={{ fontWeight: 500 }}
            >
              요금제
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              style={{ fontWeight: 500 }}
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("hero")}
              className="block w-full px-6 py-2.5 bg-[#2E6EFF] text-white rounded-xl hover:bg-[#1e5eff] transition-all text-center shadow-md"
              style={{ fontWeight: 600 }}
            >
              시작하기
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
