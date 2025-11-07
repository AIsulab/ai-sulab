import { motion } from "motion/react";
import { useState } from "react";
import { DesignPixelHeader } from "../components/shared/DesignPixelHeader";
import { DesignPixelFooter } from "../components/shared/DesignPixelFooter";
import { Calendar, Eye, ChevronRight } from "lucide-react";

export function NoticePage() {
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const notices = [
    {
      id: 1520,
      title: "SULAB 웹사이트 리뉴얼 완료 안내",
      date: "2025-11-04",
      views: 1247,
      category: "업데이트",
      content: `안녕하세요, SULAB입니다.

더욱 나은 사용자 경험을 제공하기 위해 웹사이트를 전면 리뉴얼하였습니다.

주요 변경 사항:
- DesignPixel 스타일의 모던한 UI/UX
- 스크롤 기반 인터랙티브 애니메이션
- 반응형 디자인 최적화
- 프로젝트 포트폴리오 섹션 강화

앞으로도 SULAB은 최고의 서비스를 제공하기 위해 노력하겠습니다.

감사합니다.`,
    },
    {
      id: 1519,
      title: "2025년 설 연휴 운영 안내",
      date: "2025-01-20",
      views: 892,
      category: "공지",
      content: `안녕하세요, SULAB입니다.

2025년 설 연휴 운영 일정을 안내드립니다.

휴무 기간: 2025년 1월 28일(화) ~ 2월 2일(일)
업무 재개: 2025년 2월 3일(월) 정상 운영

휴무 기간 중 긴급 문의사항은 이메일(sulabstore@naver.com)로 남겨주시면
업무 재개 후 순차적으로 답변드리겠습니다.

새해 복 많이 받으세요.`,
    },
    {
      id: 1518,
      title: "AI 기반 마케팅 자동화 서비스 출시",
      date: "2025-01-10",
      views: 1653,
      category: "신규 서비스",
      content: `SULAB의 신규 서비스를 소개합니다.

AI 기반 마케팅 자동화 서비스가 출시되었습니다.

주요 기능:
- 고객 행동 패턴 분석
- 개인화된 콘텐츠 자동 생성
- 최적 발송 시간 예측
- 실시간 성과 분석 대시보드

자세한 내용은 프로젝트 의뢰 페이지에서 확인하실 수 있습니다.`,
    },
    {
      id: 1517,
      title: "포트폴리오 갤러리 업데이트",
      date: "2024-12-15",
      views: 728,
      category: "업데이트",
      content: `최신 프로젝트 사례가 추가되었습니다.

새롭게 추가된 포트폴리오:
- E-commerce 플랫폼 구축 사례
- 모바일 헬스케어 앱 개발 사례
- 기업 브랜드 리뉴얼 사례

Portfolio 페이지에서 확인하실 수 있습니다.`,
    },
    {
      id: 1516,
      title: "고객센터 운영 시간 안내",
      date: "2024-12-01",
      views: 531,
      category: "공지",
      content: `SULAB 고객센터 운영 시간을 안내드립니다.

평일: 09:00 - 18:00
점심시간: 12:00 - 13:00
주말 및 공휴일: 휴무

카카오톡 문의는 24시간 접수 가능하며,
순차적으로 답변드리고 있습니다.`,
    },
    {
      id: 1515,
      title: "개인정보 처리방침 개정 안내",
      date: "2024-11-15",
      views: 425,
      category: "공지",
      content: `개인정보 처리방침이 개정되었습니다.

시행일: 2024년 12월 1일
주요 개정 내용:
- 개인정보 수집 항목 명확화
- 개인정보 보유 기간 구체화
- 제3자 제공 현황 업데이트

자세한 내용은 홈페이지 하단에서 확인하실 수 있습니다.`,
    },
    {
      id: 1514,
      title: "SULAB 파트너십 프로그램 출시",
      date: "2024-11-01",
      views: 1124,
      category: "신규 서비스",
      content: `SULAB 파트너십 프로그램을 시작합니다.

혜택:
- 프로젝트 우선 배정
- 특별 할인 제공
- 전담 매니저 지원
- 정기 컨설팅

자세한 내용은 Contact 페이지를 통해 문의해주세요.`,
    },
    {
      id: 1513,
      title: "모바일 앱 출시 예정",
      date: "2024-10-20",
      views: 957,
      category: "업데이트",
      content: `SULAB 모바일 앱이 곧 출시됩니다.

주요 기능:
- 프로젝트 진행 현황 실시간 확인
- 메시지 알림
- 파일 공유
- 결제 관리

iOS 및 Android 동시 출시 예정입니다.`,
    },
    {
      id: 1512,
      title: "홈페이지 서비스 점검 완료",
      date: "2024-10-15",
      views: 634,
      category: "공지",
      content: `홈페이지 서비스 점검이 완료되었습니다.

점검 내용:
- 서버 안정성 향상
- 페이지 로딩 속도 개선
- 보안 업데이트

이용에 불편을 드려 죄송합니다.
더 나은 서비스로 보답하겠습니다.`,
    },
    {
      id: 1511,
      title: "브랜딩 패키지 할인 이벤트",
      date: "2024-10-01",
      views: 1342,
      category: "이벤트",
      content: `브랜딩 패키지 특별 할인 이벤트를 진행합니다.

기간: 2024년 10월 1일 ~ 10월 31일
할인율: 최대 30%
대상: CI/BI 디자인 패키지

이벤트 기간 내 문의 주시면 상담 가능합니다.`,
    },
    {
      id: 1510,
      title: "웹사이트 제작 사례집 발간",
      date: "2024-09-20",
      views: 812,
      category: "업데이트",
      content: `SULAB 웹사이트 제작 사례집이 발간되었습니다.

수록 내용:
- 업종별 웹사이트 제작 사례
- 디자인 트렌드 분석
- 성공 사례 인터뷰

Portfolio 페이지에서 PDF로 다운로드 가능합니다.`,
    },
  ];

  // Pagination logic
  const totalPages = Math.ceil(notices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = notices.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-black">
      <DesignPixelHeader currentPage="notice" />

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

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center mb-16">
          <motion.p
            className="text-[#CBA135] mb-4"
            style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.2em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            NOTICE BOARD
          </motion.p>

          <motion.h1
            className="text-white mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 5rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            공지사항
          </motion.h1>

          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            SULAB의 새로운 소식과<br />
            업데이트를 확인하세요
          </motion.p>
        </div>
      </section>

      {/* Notice List */}
      <section className="relative pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-4">
            {currentNotices.map((notice, index) => (
              <motion.div
                key={notice.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                onClick={() => setSelectedNotice(selectedNotice === notice.id ? null : notice.id)}
              >
                {/* Notice Header */}
                <div className="p-6 border border-white/10 hover:border-[#CBA135]/50 transition-all">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span
                          className="px-3 py-1 border border-[#CBA135]/50 text-[#CBA135]"
                          style={{ fontSize: "0.75rem", letterSpacing: "0.1em" }}
                        >
                          {notice.category}
                        </span>
                        <div className="flex items-center gap-4 text-white/40" style={{ fontSize: "0.875rem" }}>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {notice.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye size={14} />
                            {notice.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <h3
                        className="text-white group-hover:text-[#CBA135] transition-colors"
                        style={{ fontSize: "1.25rem", fontWeight: 700 }}
                      >
                        {notice.title}
                      </h3>
                    </div>

                    <motion.div
                      animate={{ rotate: selectedNotice === notice.id ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="text-white/40 group-hover:text-[#CBA135]" size={24} />
                    </motion.div>
                  </div>
                </div>

                {/* Notice Content */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedNotice === notice.id ? "auto" : 0,
                    opacity: selectedNotice === notice.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-8 border-l border-r border-b border-white/10 bg-white/5">
                    <div className="prose prose-invert max-w-none">
                      <p
                        className="text-white/70 whitespace-pre-line"
                        style={{ fontSize: "0.9375rem", lineHeight: 1.8 }}
                      >
                        {notice.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          <motion.div
            className="mt-16 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setSelectedNotice(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-10 h-10 border transition-all ${
                  page === currentPage
                    ? "border-[#CBA135] bg-[#CBA135] text-black"
                    : "border-white/20 text-white hover:border-white/50"
                }`}
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                {page}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <DesignPixelFooter />
    </div>
  );
}
