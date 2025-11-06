import { motion } from "motion/react";
import { DesignPixelHeader } from "../components/shared/DesignPixelHeader";
import { DesignPixelFooter } from "../components/shared/DesignPixelFooter";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export function ContactPage() {
  const contactInfo: Array<{
    icon: any;
    title: string;
    content: string;
    description: string;
    link?: string;
  }> = [
    {
      icon: Phone,
      title: "전화",
      content: "010 7707 7057",
      description: "평일 09:00 - 18:00",
    },
    {
      icon: Phone,
      title: "팩스",
      content: "0504 436 7057",
      description: "24시간 접수 가능",
    },
    {
      icon: MessageCircle,
      title: "카카오톡",
      content: "오픈채팅",
      description: "실시간 상담 가능",
      link: "https://open.kakao.com/o/siMggc8f",
    },
    {
      icon: Mail,
      title: "대표자",
      content: "이진수",
      description: "상호명: SULAB",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <DesignPixelHeader currentPage="contact" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CBA135]/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#CBA135]/5 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.p
              className="text-[#CBA135] mb-4"
              style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.2em" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              CONTACT US
            </motion.p>

            <motion.h1
              className="text-white mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 700, letterSpacing: "0.02em" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              문의하기
            </motion.h1>

            <motion.p
              className="text-white/70 max-w-2xl mx-auto"
              style={{ fontSize: "1.125rem", lineHeight: 1.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              SULAB과 함께할 여정을 시작하세요<br />
              언제든 문의해 주시면 성심껏 답변드리겠습니다
            </motion.p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-8 border border-white/10 hover:border-[#CBA135]/50 transition-all"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#CBA135]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative">
                    <div className="w-12 h-12 border border-white/20 flex items-center justify-center mb-6 group-hover:border-[#CBA135] transition-colors">
                      <Icon className="text-white" size={20} />
                    </div>

                    <h3
                      className="text-white mb-3"
                      style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.1em" }}
                    >
                      {info.title}
                    </h3>

                    <p
                      className="text-white mb-2"
                      style={{ fontSize: "1rem", fontWeight: 600 }}
                    >
                      {info.content}
                    </p>

                    <p
                      className="text-white/50"
                      style={{ fontSize: "0.875rem" }}
                    >
                      {info.description}
                    </p>

                    {info.link && (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-[#CBA135] hover:underline"
                        style={{ fontSize: "0.875rem" }}
                      >
                        바로가기 →
                      </a>
                    )}

                    <div className="w-12 h-[1px] bg-[#CBA135] mt-6 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Message */}
          <motion.div
            className="max-w-3xl mx-auto p-10 border border-white/10 bg-white/5"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-14 h-14 border border-white/20 flex items-center justify-center">
                <MessageCircle className="text-white" size={24} />
              </div>

              <div className="flex-1">
                <h3 className="text-white mb-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  빠른 상담이 필요하신가요?
                </h3>
                <p className="text-white/60 mb-6" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                  프로젝트 의뢰서를 작성하시면 더욱 빠르고 정확한 상담이 가능합니다
                </p>

                <motion.button
                  onClick={() => window.location.hash = "/request"}
                  className="px-8 py-3 bg-[#CBA135] text-black hover:bg-[#CBA135]/90 transition-all"
                  style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.05em" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  프로젝트 의뢰하기
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative py-32 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2
                className="text-white mb-6"
                style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "0.02em" }}
              >
                찾아오시는 길
              </h2>
              <div className="w-20 h-[2px] bg-[#CBA135] mb-8"></div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white mb-2" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                    주소
                  </h3>
                  <p className="text-white/60" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                    전북특별자치도 전주시<br />
                    SULAB 본사
                  </p>
                </div>

                <div>
                  <h3 className="text-white mb-2" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                    대중교통
                  </h3>
                  <p className="text-white/60" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                    지하철: 가까운 역에서 도보 5분<br />
                    버스: 주요 노선 이용 가능
                  </p>
                </div>

                <div>
                  <h3 className="text-white mb-2" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                    주차 안내
                  </h3>
                  <p className="text-white/60" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                    건물 내 주차장 이용 가능<br />
                    방문 전 문의 바랍니다
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative aspect-square lg:aspect-auto"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center">
                <p className="text-white/40" style={{ fontSize: "0.875rem", letterSpacing: "0.1em" }}>
                  MAP PLACEHOLDER
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="relative py-32 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            className="text-white mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            자주 묻는 질문
          </motion.h2>

          <motion.p
            className="text-white/60 mb-12"
            style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            궁금하신 내용을 빠르게 확인하세요
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 text-left">
            {[
              { q: "프로젝트 진행 기간은 얼마나 걸리나요?", a: "프로젝트 규모에 따라 2주~3개월" },
              { q: "견적은 무료인가요?", a: "네, 모든 견적은 무료로 제공됩니다" },
              { q: "유지보수 서비스도 제공하나요?", a: "네, 별도 계약으로 제공 가능합니다" },
              { q: "계약금은 얼마인가요?", a: "프로젝트 총액의 30% 선금입니다" },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 border border-white/10 hover:border-[#CBA135]/50 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-white mb-3" style={{ fontSize: "0.9375rem", fontWeight: 700 }}>
                  {faq.q}
                </h3>
                <p className="text-white/60" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <DesignPixelFooter />
    </div>
  );
}
