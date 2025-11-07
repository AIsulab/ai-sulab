import { motion } from "motion/react";
import { Sparkles, Users, BarChart3, Zap } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeatureShowcase() {
  const features = [
    {
      icon: Sparkles,
      title: "AI 콘텐츠 자동 생성",
      description: "텍스트, 이미지, 영상까지 AI가 몇 초 만에 자동으로 생성합니다.",
      image: "https://images.unsplash.com/photo-1758468772760-837fb2cde7c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb24lMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyMTM4NjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "#2E6EFF",
    },
    {
      icon: Users,
      title: "프로젝트 협업 시스템",
      description: "팀원들과 실시간으로 협업하며 프로젝트를 관리할 수 있습니다.",
      image: "https://images.unsplash.com/photo-1565350897149-38dfafa81d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsYWJvcmF0aW9uJTIwdGVhbXdvcmt8ZW58MXx8fHwxNzYyMTg5NzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "#00C2B7",
    },
    {
      icon: BarChart3,
      title: "데이터 기반 분석 리포트",
      description: "실시간 데이터 분석으로 성과를 한눈에 확인하고 개선점을 찾습니다.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MjE2NDkzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "#2E6EFF",
    },
    {
      icon: Zap,
      title: "빠른 속도와 안정성",
      description: "클라우드 기반 인프라로 언제 어디서나 빠르고 안정적으로 작업합니다.",
      image: "https://images.unsplash.com/photo-1660165458059-57cfb6cc87e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3klMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjIxMDYwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      color: "#00C2B7",
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-5 py-2 bg-blue-100 text-[#2E6EFF] rounded-full mb-4">
            <span style={{ fontWeight: 600 }}>✨ 핵심 기능</span>
          </div>
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            SULAB의 강력한 기능들
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            AI 기술로 당신의 창작 활동을 더욱 쉽고 빠르게 만들어드립니다
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                    style={{ backgroundColor: feature.color }}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-gray-900 mb-3" style={{ fontSize: "1.375rem", fontWeight: 700 }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
