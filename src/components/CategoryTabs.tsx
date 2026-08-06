import React from 'react';
import { MarketCategory } from '../types';
import { Star } from 'lucide-react';

interface CategoryTabsProps {
  selectedCategory: MarketCategory | 'watchlist';
  onSelectCategory: (cat: MarketCategory | 'watchlist') => void;
  favoritesCount: number;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedCategory,
  onSelectCategory,
  favoritesCount,
}) => {
  const tabs: { id: MarketCategory | 'watchlist'; label: string; icon?: boolean }[] = [
    { id: 'indices', label: 'Indices' },
    { id: 'stocks', label: 'US stocks' },
    { id: 'world-stocks', label: 'World stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'futures', label: 'Futures' },
    { id: 'forex', label: 'Forex' },
    { id: 'bonds', label: 'Bonds' },
    { id: 'etfs', label: 'ETFs' },
    { id: 'economy', label: 'Economy' },
    { id: 'watchlist', label: `Watchlist (${favoritesCount})`, icon: true },
  ];

  return (
    <nav className="flex overflow-x-auto hide-scrollbar gap-8 border-b border-[#E0E3EB] dark:border-[#2a2e39] mb-8 pb-1 scroll-smooth">
      {tabs.map((tab) => {
        const isActive = selectedCategory === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`font-label-sm text-label-sm pb-2.5 whitespace-nowrap transition-colors flex items-center gap-1.5 cursor-pointer ${
              isActive
                ? 'text-[#0049db] dark:text-[#b6c4ff] border-b-2 border-[#0049db] dark:border-[#b6c4ff] font-semibold'
                : 'text-[#434656] dark:text-[#a3a6af] hover:text-[#171b26] dark:hover:text-white'
            }`}
          >
            {tab.icon && <Star className={`w-3.5 h-3.5 ${favoritesCount > 0 ? 'fill-amber-400 text-amber-400' : ''}`} />}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
