import React, { useState, useEffect } from 'react';
import { MarketCategory, MarketSymbol } from './types';
import { MARKETS_DATA, LATEST_NEWS } from './data/marketsData';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { CategoryTabs } from './components/CategoryTabs';
import { IndexCards } from './components/IndexCards';
import { SymbolTable } from './components/SymbolTable';
import { SymbolDetailModal } from './components/SymbolDetailModal';
import { SearchModal } from './components/SearchModal';
import { GetStartedModal } from './components/GetStartedModal';
import { Footer } from './components/Footer';
import { Newspaper, ChevronRight } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory | 'watchlist'>('indices');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedSymbolModal, setSelectedSymbolModal] = useState<MarketSymbol | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Watchlist stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_favorites');
      return saved ? JSON.parse(saved) : ['sp500', 'aapl', 'btc', 'ni225'];
    } catch {
      return ['sp500', 'aapl', 'btc', 'ni225'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tv_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter symbols based on category & region
  const categorySymbols = MARKETS_DATA.filter((s) => {
    if (selectedCategory === 'watchlist') {
      return favorites.includes(s.id);
    }
    return s.category === selectedCategory;
  });

  // Highlight items for top cards
  const highlightCardsSymbols =
    selectedCategory === 'indices'
      ? MARKETS_DATA.filter((s) => ['sp500', 'nasdaq100', 'dow30'].includes(s.id))
      : categorySymbols.slice(0, 3);

  // Table items
  const tableSymbols =
    selectedCategory === 'indices'
      ? MARKETS_DATA.filter((s) => ['ni225', 'ukx', 'gdaxi'].includes(s.id))
      : categorySymbols.slice(0, 10);

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'indices': return 'Indices';
      case 'stocks': return 'US Stocks';
      case 'world-stocks': return 'World Stocks';
      case 'crypto': return 'Crypto Assets';
      case 'futures': return 'Commodities & Futures';
      case 'forex': return 'Forex Currency Pairs';
      case 'bonds': return 'Government Bonds';
      case 'etfs': return 'Exchange Traded Funds';
      case 'economy': return 'Economic Indicators';
      case 'watchlist': return 'Your Watchlist';
      default: return 'Markets';
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] dark:bg-[#131722] text-[#171b26] dark:text-[#d1d4dc] font-body-md flex flex-col transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Hero Headline */}
        <HeroHeader
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        {/* Category Filter Tabs */}
        <CategoryTabs
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          favoritesCount={favorites.length}
        />

        {/* Category Highlight Cards (e.g. S&P 500, Nasdaq 100, Dow 30) */}
        {highlightCardsSymbols.length > 0 && (
          <IndexCards
            symbols={highlightCardsSymbols}
            onSelectSymbol={(sym) => setSelectedSymbolModal(sym)}
            categoryTitle={getCategoryTitle()}
          />
        )}

        {/* World Indices Table / Category Table */}
        <SymbolTable
          title={selectedCategory === 'indices' ? 'World indices' : `${getCategoryTitle()} List`}
          symbols={tableSymbols.length > 0 ? tableSymbols : categorySymbols}
          onSelectSymbol={(sym) => setSelectedSymbolModal(sym)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          seeAllText={selectedCategory === 'indices' ? 'See all major indices' : `See all ${getCategoryTitle()}`}
          onSeeAllClick={() => setIsSearchOpen(true)}
        />

        {/* Latest Market News Section */}
        <section className="mb-12 border-t border-[#E0E3EB] dark:border-[#2a2e39] pt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-[#0049db] dark:text-[#b6c4ff]" />
              <h3 className="font-headline-md text-headline-md text-[#171b26] dark:text-[#f0f3fa]">
                Market News & Insights
              </h3>
            </div>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-xs font-semibold text-[#0049db] dark:text-[#b6c4ff] hover:underline flex items-center gap-1"
            >
              <span>More news</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LATEST_NEWS.map((news) => (
              <div
                key={news.id}
                onClick={() => {
                  const matched = MARKETS_DATA.find(s => s.id === news.relatedSymbol);
                  if (matched) setSelectedSymbolModal(matched);
                }}
                className="p-4 bg-white dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39] transition-colors cursor-pointer flex flex-col justify-between"
              >
                <h4 className="font-semibold text-sm text-[#171b26] dark:text-[#f0f3fa] hover:text-[#0049db] transition-colors leading-snug mb-3">
                  {news.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#737687]">
                  <span className="font-medium text-[#0049db] dark:text-[#b6c4ff]">{news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <SymbolDetailModal
        symbol={selectedSymbolModal}
        onClose={() => setSelectedSymbolModal(null)}
        isFavorite={selectedSymbolModal ? favorites.includes(selectedSymbolModal.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        symbols={MARKETS_DATA}
        onSelectSymbol={(sym) => setSelectedSymbolModal(sym)}
      />

      <GetStartedModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </div>
  );
}
