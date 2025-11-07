import { motion } from "motion/react";
import { Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DemoVideoSection() {
  return (
    <section id="demo" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-5 py-2 bg-gradient-to-r from-[#2E6EFF]/10 to-[#00C2B7]/10 text-[#2E6EFF] rounded-full mb-4">
            <span style={{ fontWeight: 600 }}>🎬 데모 영상</span>
          </div>
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            AI가 만든 영상을 확인하세요
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            몇 번의 클릭만으로 전문가 수준의 콘텐츠를 생성할 수 있습니다
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Video Placeholder */}
            <div className="relative aspect-video bg-gradient-to-br from-[#2E6EFF] to-[#00C2B7]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1673767297196-ce9739933932?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBzdHVkaW98ZW58MXx8fHwxNzYyMTg3MTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Video Demo"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="group w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110 shadow-2xl">
                  <Play size={40} className="text-white ml-1" fill="white" />
                </button>
              </div>

              {/* Text Overlay */}
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <h3 className="mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                  AI가 만든 영상
                </h3>
                <p className="text-white/90" style={{ fontSize: "1.125rem" }}>
                  프롬프트 입력 후 3분 만에 완성된 프로페셔널 영상
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 w-72 h-72 bg-[#2E6EFF]/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-[#00C2B7]/20 rounded-full blur-3xl -z-10"></div>
        </motion.div>

        {/* Demo Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button className="px-8 py-4 bg-gradient-to-r from-[#2E6EFF] to-[#00C2B7] text-white rounded-xl hover:shadow-2xl transition-all hover:scale-105 inline-flex items-center gap-2">
            <Play size={20} />
            <span style={{ fontSize: "1.125rem", fontWeight: 700 }}>데모 체험하기</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
