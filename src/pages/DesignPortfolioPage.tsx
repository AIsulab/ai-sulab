import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DesignPixelHeader } from "../components/shared/DesignPixelHeader";
import { DesignPixelFooter } from "../components/shared/DesignPixelFooter";
import { X, Filter, Search } from "lucide-react";
import { portfolioData, categories, PortfolioItem } from "../data/portfolioData";

export function DesignPortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredPortfolio = portfolioData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black">
      <DesignPixelHeader currentPage="design-portfolio" />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-20">
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

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.p
            className="text-[#CBA135] mb-4"
            style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.2em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            DESIGN PORTFOLIO
          </motion.p>

          <motion.h1
            className="text-white mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 700, letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            디자인 작업물
          </motion.h1>

          <motion.p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            창의성과 전략이 만나는 곳<br />
            SULAB의 디자인 프로젝트를 소개합니다
          </motion.p>
        </div>
      </section>

      {/* Filter & Search Section */}
      <section className="relative py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Search Bar */}
          <motion.div
            className="mb-8 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#CBA135]/50 transition-colors"
              />
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 text-white/60 mr-4">
              <Filter className="w-4 h-4" />
              <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>FILTER</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-[#CBA135] text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.p
            className="text-center text-white/40 mb-12"
            style={{ fontSize: "0.875rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredPortfolio.length}개의 작���물
          </motion.p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="relative py-12 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white/5 rounded-lg mb-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div>
                        <p className="text-white/60 mb-1" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em" }}>
                          {item.category}
                        </p>
                        <p className="text-white" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                          자세히 보기
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-white group-hover:text-[#CBA135] transition-colors" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                      {item.title}
                    </h3>
                    <p className="text-white/60 line-clamp-2" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-white/5 text-white/50 rounded-full"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredPortfolio.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-white/40" style={{ fontSize: "1.125rem" }}>
                검색 결과가 없습니다
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.button
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors z-10"
              onClick={() => setSelectedItem(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-8 h-8" />
            </motion.button>

            <motion.div
              className="max-w-6xl w-full bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white/5">
                  <img
                    src={selectedItem.fullImage}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center space-y-6">
                  <div>
                    <p className="text-[#CBA135] mb-2" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em" }}>
                      {selectedItem.category}
                    </p>
                    <h2 className="text-white mb-4" style={{ fontSize: "2rem", fontWeight: 700 }}>
                      {selectedItem.title}
                    </h2>
                    <p className="text-white/70" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
                      {selectedItem.description}
                    </p>
                  </div>

                  {selectedItem.client && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-white/40 mb-1" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        CLIENT
                      </p>
                      <p className="text-white" style={{ fontSize: "0.875rem" }}>
                        {selectedItem.client}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/40 mb-3" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      TAGS
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white/5 text-white/70 rounded-full"
                          style={{ fontSize: "0.875rem" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/40" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      DATE
                    </p>
                    <p className="text-white" style={{ fontSize: "0.875rem" }}>
                      {selectedItem.date}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <DesignPixelFooter />
    </div>
  );
}