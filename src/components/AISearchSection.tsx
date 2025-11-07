import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

export function AISearchSection() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Array<{ title: string; description: string }>>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);

    // Simulate AI search
    setTimeout(() => {
      const mockResults = [
        {
          title: `"${query}"에 최적화된 웹사이트 제작`,
          description: "반응형 디자인과 SEO 최적화를 포함한 맞춤형 웹사이트를 제작해드립니다. WordPress 또는 커스텀 개발 중 선택 가능합니다.",
        },
        {
          title: `${query} 브랜드 디자인 솔루션`,
          description: "브랜드 아이덴티티부터 마케팅 콘텐츠까지, 일관된 비주얼 시스템을 구축합니다.",
        },
        {
          title: `${query} 관련 마케팅 전략`,
          description: "Google, Meta, 네이버 광고를 통해 타겟 고객에게 효과적으로 도달하는 맞춤 마케팅 전략을 제공합니다.",
        },
      ];
      setResults(mockResults);
      setIsSearching(false);
    }, 800);
  };

  return (
    <section id="ai-search" className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm mb-4">
            <Sparkles size={18} className="text-[#2563EB]" />
            <span className="text-[#2563EB]" style={{ fontWeight: 600 }}>AI 검색</span>
          </div>
          <h2 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            AI로 찾는 맞춤 솔루션
          </h2>
          <p className="text-gray-600" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
            원하시는 서비스를 검색하면 AI가 최적의 솔루션을 추천해드립니다.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="예: 카페 홈페이지, 브랜딩, 인스타그램 광고..."
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#2563EB] transition-colors"
                style={{ fontSize: "1rem" }}
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-8 py-4 bg-[#2563EB] text-white rounded-xl hover:bg-[#1d4ed8] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              style={{ fontWeight: 600 }}
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>검색 중...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>AI 검색</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              검색 결과
            </h3>
            {results.map((result, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#2563EB] hover:shadow-lg transition-all cursor-pointer"
              >
                <h4 className="text-gray-900 mb-2" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                  {result.title}
                </h4>
                <p className="text-gray-600" style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Placeholder when no results */}
        {results.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-[#2563EB]" />
            </div>
            <p className="text-gray-500" style={{ fontSize: "1rem" }}>
              검색어를 입력하고 AI 검색을 시작해보세요
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
