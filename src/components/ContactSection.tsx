import { useState } from "react";
import { Mail, MapPin, MessageCircle, Send, CheckCircle } from "lucide-react";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      // In production, this would be: await fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            프로젝트 문의하기
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            궁금한 점이 있으시면 언제든지 연락주세요. 빠르게 답변드리겠습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2563EB] transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Mail size={24} className="text-[#2563EB]" />
              </div>
              <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>이메일</h3>
              <a href="mailto:sulabstore@naver.com" className="text-gray-600 hover:text-[#2563EB] transition-colors">
                sulabstore@naver.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2563EB] transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin size={24} className="text-[#2563EB]" />
              </div>
              <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>위치</h3>
              <p className="text-gray-600">전북특별자치도 전주시</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#2563EB] transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <MessageCircle size={24} className="text-[#2563EB]" />
              </div>
              <h3 className="text-gray-900 mb-2" style={{ fontWeight: 700 }}>카카오톡 상담</h3>
              <a
                href="https://open.kakao.com/o/siMggc8f"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2563EB] hover:text-[#1d4ed8] transition-colors inline-flex items-center gap-1"
                style={{ fontWeight: 600 }}
              >
                오픈채팅 바로가기 →
              </a>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                    문의가 접수되었습니다!
                  </h3>
                  <p className="text-gray-600">
                    빠른 시일 내에 답변드리겠습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                      이름 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors"
                      placeholder="홍길동"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                      이메일 *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 mb-2" style={{ fontWeight: 600 }}>
                      메시지 *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors resize-none"
                      placeholder="프로젝트에 대해 자세히 설명해주세요."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1d4ed8] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                    style={{ fontWeight: 600 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>전송 중...</span>
                      </>
                    ) : (
                      <>
                        <span>문의 보내기</span>
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
