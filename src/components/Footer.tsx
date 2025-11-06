import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react";
import logo from "figma:asset/abf9816ebaecbe448905f80cd9fb228c25413530.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <img src={logo} alt="SULAB" className="h-12 w-auto brightness-0 invert" />
            </div>
            <p className="text-gray-400 mb-6" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
              AI 기술로 콘텐츠 창작의<br />
              새로운 기준을 만들어갑니다.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2E6EFF] transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2E6EFF] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2E6EFF] transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#2E6EFF] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4" style={{ fontWeight: 700 }}>제품</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                  기능
                </a>
              </li>
              <li>
                <a href="#demo" className="text-gray-400 hover:text-white transition-colors">
                  데모
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                  요금제
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  업데이트
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4" style={{ fontWeight: 700 }}>지원</h3>
            <ul className="space-y-3">
              <li>
                <a href="#faq" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  고객센터
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  커뮤니티
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  튜토리얼
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4" style={{ fontWeight: 700 }}>회사</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  소개
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  채용
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  블로그
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  파트너십
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>
              © 2025 SULAB. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-500" style={{ fontSize: "0.875rem" }}>
              <a href="#" className="hover:text-white transition-colors">이용약관</a>
              <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
              <a href="mailto:sulabstore@naver.com" className="hover:text-white transition-colors">
                문의: sulabstore@naver.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
