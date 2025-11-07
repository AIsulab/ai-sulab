import { motion } from "motion/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "SULAB을 무료로 사용할 수 있나요?",
      answer: "네! Free 플랜을 통해 월 10개의 AI 콘텐츠를 무료로 생성할 수 있습니다. 신용카드 등록 없이 바로 시작할 수 있으며, 언제든지 Pro 플랜으로 업그레이드 가능합니다.",
    },
    {
      question: "AI 생성물의 저작권은 누구에게 있나요?",
      answer: "SULAB에서 생성한 모든 콘텐츠의 저작권은 100% 사용자에게 귀속됩니다. 상업적 용도로도 자유롭게 사용 가능하며, 별도의 라이선스 비용은 없습니다.",
    },
    {
      question: "어떤 종류의 콘텐츠를 만들 수 있나요?",
      answer: "텍스트, 이미지, 영상, 음성 등 다양한 형태의 콘텐츠를 생성할 수 있습니다. 블로그 글, SNS 포스트, 마케팅 카피, 제품 설명, 영상 스크립트, 썸네일 등 거의 모든 유형의 디지털 콘텐츠 제작이 가능합니다.",
    },
    {
      question: "팀원들과 협업할 수 있나요?",
      answer: "Pro 플랜 이상에서 팀 협업 기능을 사용할 수 있습니다. 프로젝트를 공유하고, 실시간으로 피드백을 주고받으며, 역할별 권한 관리도 가능합니다.",
    },
    {
      question: "언제든지 플랜을 변경할 수 있나요?",
      answer: "네! 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 업그레이드 시 즉시 새 기능을 사용할 수 있으며, 다운그레이드는 다음 결제 주기부터 적용됩니다.",
    },
    {
      question: "환불 정책은 어떻게 되나요?",
      answer: "14일 무료 체험 기간 동안 언제든지 취소 가능하며, 유료 구독 후 7일 이내 100% 환불이 가능합니다. 단, 서비스를 과도하게 사용한 경우는 제외될 수 있습니다.",
    },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-5 py-2 bg-white text-[#2E6EFF] rounded-full shadow-sm mb-4">
            <span style={{ fontWeight: 600 }}>❓ FAQ</span>
          </div>
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            자주 묻는 질문
          </h2>
          <p className="text-gray-600" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            궁금한 점이 있으시면 언제든지 문의해주세요
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900 pr-4" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                  {faq.question}
                </span>
                <ChevronDown
                  size={24}
                  className={`text-[#2E6EFF] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-gray-600" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
