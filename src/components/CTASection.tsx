import { ArrowRight } from "lucide-react";

export function CTASection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-28 bg-[#0f172a] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2563EB]/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-white mb-6" style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.3 }}>
          지금 바로 상담을 시작해 보세요
        </h2>
        <p className="text-gray-300 mb-10 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
          프로젝트에 대한 궁금한 점이 있으시면 언제든지 문의해주세요.<br />
          전문 상담사가 24시간 내에 답변드립니다.
        </p>
        <button
          onClick={scrollToContact}
          className="px-10 py-5 bg-[#2563EB] text-white rounded-xl hover:bg-[#1d4ed8] transition-all hover:scale-105 hover:shadow-2xl inline-flex items-center gap-3"
          style={{ fontSize: "1.125rem", fontWeight: 700 }}
        >
          <span>문의 남기기</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </section>
  );
}
