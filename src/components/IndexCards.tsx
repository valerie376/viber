import React from 'react';
import { MarketSymbol } from '../types';

interface IndexCardsProps {
  symbols: MarketSymbol[];
  onSelectSymbol: (symbol: MarketSymbol) => void;
  categoryTitle?: string;
}

export const IndexCards: React.FC<IndexCardsProps> = ({
  symbols,
  onSelectSymbol,
  categoryTitle = 'Indices',
}) => {
  if (!symbols || symbols.length === 0) return null;

  const cardsToDisplay = symbols.slice(0, 3);

  return (
    <div className="mb-12">
      {/* Section Title Header */}
      <div 
        onClick={() => cardsToDisplay[0] && onSelectSymbol(cardsToDisplay[0])}
        className="flex items-center mb-6 gap-1 group cursor-pointer w-fit"
      >
        <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#171b26] dark:text-[#f0f3fa]">
          {categoryTitle}
        </h2>
        <span className="material-symbols-outlined text-[32px] text-[#171b26] dark:text-[#f0f3fa] group-hover:translate-x-1 transition-transform">
          chevron_right
        </span>
      </div>

      {/* Grid of Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardsToDisplay.map((item, index) => {
          const isNegative = item.change < 0;

          // Generate simple smooth SVG sparkline path
          const min = Math.min(...item.sparkline);
          const max = Math.max(...item.sparkline);
          const range = max - min || 1;
          const svgWidth = 80;
          const svgHeight = 28;
          const points = item.sparkline
            .map((val, idx) => {
              const x = (idx / (item.sparkline.length - 1)) * svgWidth;
              const y = svgHeight - ((val - min) / range) * (svgHeight - 4) - 2;
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <div
              key={item.id}
              onClick={() => onSelectSymbol(item)}
              className={`flex items-center p-4 rounded-xl transition-all cursor-pointer group border ${
                index === 0
                  ? 'bg-[#F0F3FA] dark:bg-[#2a2e39] border-transparent hover:border-[#E0E3EB] dark:hover:border-[#363a45]'
                  : 'bg-white dark:bg-[#1e222d] border-[#E0E3EB] dark:border-[#2a2e39] hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39]'
              }`}
            >
              {/* Badge or Icon */}
              {item.badge ? (
                <div
                  style={{ backgroundColor: item.badgeBg || '#00A1E0' }}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-label-sm text-label-sm shrink-0 mr-4 font-bold shadow-sm"
                >
                  {item.badge}
                </div>
              ) : item.flagUrl ? (
                <img
                  src={item.flagUrl}
                  alt={item.symbol}
                  className="w-12 h-12 rounded-full object-cover shrink-0 mr-4 border border-[#E0E3EB]"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#dfe2f2] dark:bg-[#363a45] text-[#171b26] dark:text-white flex items-center justify-center font-bold text-[14px] shrink-0 mr-4">
                  {item.symbol.substring(0, 3)}
                </div>
              )}

              {/* Symbol Details */}
              <div className="flex-grow min-w-0 pr-2">
                <div className="font-body-md text-body-md text-[#171b26] dark:text-[#f0f3fa] font-semibold group-hover:text-[#0049db] dark:group-hover:text-[#b6c4ff] transition-colors truncate">
                  {item.symbol}
                </div>
                <div
                  className={`font-data-tabular text-data-tabular flex items-center gap-1 font-semibold ${
                    isNegative ? 'text-[#F23645]' : 'text-[#089981]'
                  }`}
                >
                  <span>{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  <span className="ml-1 text-[13px]">
                    {isNegative ? '−' : '+'}{Math.abs(item.changePercent).toFixed(2)}%
                  </span>
                </div>
              </div>

              {/* Mini Sparkline Chart */}
              <div className="w-20 h-8 flex items-center justify-end shrink-0">
                <svg width={svgWidth} height={svgHeight} className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke={isNegative ? '#F23645' : '#089981'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
