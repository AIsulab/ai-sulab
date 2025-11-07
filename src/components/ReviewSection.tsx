import { motion } from "motion/react";
import { Star, MessageCircle } from "lucide-react";

export function ReviewSection() {
  const reviews = [
    {
      name: "김민수",
      role: "콘텐츠 크리에이터",
      rating: 5,
      content: "SULAB을 사용한 후 콘텐츠 제작 시간이 70% 줄었어요. AI가 정말 똑똑하게 제안해주고, 퀄리티도 기대 이상입니다!",
      avatar: "KM",
      color: "#2E6EFF",
    },
    {
      name: "박지은",
      role: "마케팅 매니저",
      rating: 5,
      content: "팀 협업 기능이 정말 편리해요. 실시간으로 피드백을 주고받으면서 프로젝트를 진행할 수 있어서 업무 효율이 크게 올랐습니다.",
      avatar: "PJ",
      color: "#00C2B7",
    },
    {
      name: "이준호",
      role: "스타트업 대표",
      rating: 5,
      content: "적은 비용으로 전문가 수준의 콘텐츠를 만들 수 있어서 스타트업에게 정말 좋은 솔루션이에요. 강력 추천합니다!",
      avatar: "LJ",
      color: "#2E6EFF",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-5 py-2 bg-white text-[#2E6EFF] rounded-full shadow-sm mb-4">
            <span style={{ fontWeight: 600 }}>💬 사용자 후기</span>
          </div>
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            고객들의 생생한 이야기
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            SULAB과 함께 성장하고 있는 수천 명의 크리에이터들
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="#FFB800" className="text-[#FFB800]" />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                "{review.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                  style={{ backgroundColor: review.color, fontWeight: 700 }}
                >
                  {review.avatar}
                </div>
                <div>
                  <div className="text-gray-900" style={{ fontWeight: 700 }}>
                    {review.name}
                  </div>
                  <div className="text-gray-600" style={{ fontSize: "0.875rem" }}>
                    {review.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Community Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <button className="px-8 py-4 bg-white text-[#2E6EFF] rounded-xl border-2 border-[#2E6EFF] hover:bg-[#2E6EFF] hover:text-white transition-all hover:scale-105 shadow-md inline-flex items-center gap-2">
            <MessageCircle size={20} />
            <span style={{ fontSize: "1.125rem", fontWeight: 700 }}>SULAB 커뮤니티로 이동</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
