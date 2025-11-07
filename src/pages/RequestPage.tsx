import { motion } from "motion/react";
import { useState } from "react";
import { DesignPixelHeader } from "../components/shared/DesignPixelHeader";
import { DesignPixelFooter } from "../components/shared/DesignPixelFooter";
import { Send, CheckCircle } from "lucide-react";

export function RequestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const projectTypes = [
    "웹사이트 개발",
    "모바일 앱 개발",
    "브랜드 아이덴티티",
    "UI/UX 디자인",
    "마케팅 자동화",
    "기타",
  ];

  const budgetRanges = [
    "500만원 미만",
    "500만원 - 1000만원",
    "1000만원 - 3000만원",
    "3000만원 이상",
    "협의 필요",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black">
      <DesignPixelHeader currentPage="request" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mb-16">
          <motion.p
            className="text-[#CBA135] mb-4"
            style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.2em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            PROJECT REQUEST
          </motion.p>

          <motion.h1
            className="text-white mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            프로젝트 의뢰
          </motion.h1>

          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            아래 양식을 작성해 주시면<br />
            24시간 내에 담당자가 연락드리겠습니다
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Name & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white mb-3"
                  style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-transparent border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#CBA135] transition-colors"
                  placeholder="홍길동"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white mb-3"
                  style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-transparent border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#CBA135] transition-colors"
                  placeholder="example@email.com"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>
            </div>

            {/* Phone & Company */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-white mb-3"
                  style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  연락처 *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-transparent border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#CBA135] transition-colors"
                  placeholder="010-1234-5678"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-white mb-3"
                  style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  회사명
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-5 py-4 bg-transparent border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#CBA135] transition-colors"
                  placeholder="회사명 (선택)"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>
            </div>

            {/* Project Type & Budget */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="projectType"
                  className="block text-white mb-3"
                  style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  프로젝트 유형 *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-black border border-white/20 text-white focus:outline-none focus:border-[#CBA135] transition-colors"
                  style={{ fontSize: "0.9375rem" }}
                >
                  <option value="">선택해주세요</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="budget"
                  className="block text-white mb-3"
                  style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
                >
                  예산 범위 *
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-black border border-white/20 text-white focus:outline-none focus:border-[#CBA135] transition-colors"
                  style={{ fontSize: "0.9375rem" }}
                >
                  <option value="">선택해주세요</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label
                htmlFor="timeline"
                className="block text-white mb-3"
                style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
              >
                희망 일정
              </label>
              <input
                type="text"
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-transparent border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#CBA135] transition-colors"
                placeholder="예: 2개월 내, 6월 완료 희망 등"
                style={{ fontSize: "0.9375rem" }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-white mb-3"
                style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.1em" }}
              >
                프로젝트 설명 *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-5 py-4 bg-transparent border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#CBA135] transition-colors resize-none"
                placeholder="프로젝트에 대해 자세히 설명해 주세요"
                style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <motion.button
                type="submit"
                disabled={isSubmitted}
                className="w-full px-12 py-5 bg-[#CBA135] text-black hover:bg-[#CBA135]/90 disabled:bg-green-600 disabled:cursor-not-allowed transition-all relative overflow-hidden"
                style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "0.05em" }}
                whileHover={!isSubmitted ? { scale: 1.02, boxShadow: "0 0 40px rgba(203, 161, 53, 0.4)" } : {}}
                whileTap={!isSubmitted ? { scale: 0.98 } : {}}
              >
                <span className="flex items-center justify-center gap-3">
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={20} />
                      전송 완료!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      프로젝트 의뢰하기
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.form>

          {/* Info Box */}
          <motion.div
            className="mt-16 p-8 border border-white/10 bg-white/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h3 className="text-white mb-4" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
              의뢰 전 안내사항
            </h3>
            <ul className="space-y-2 text-white/60" style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
              <li className="flex items-start gap-2">
                <span className="text-[#CBA135] mt-2">•</span>
                <span>모든 문의는 24시간 내에 답변드립니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#CBA135] mt-2">•</span>
                <span>정확한 견적을 위해 프로젝트 내용을 상세히 작성해 주세요</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#CBA135] mt-2">•</span>
                <span>참고 자료가 있다면 이메일로 함께 보내주시면 더욱 정확한 상담이 가능합니다</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <DesignPixelFooter />
    </div>
  );
}
