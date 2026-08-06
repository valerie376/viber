import React from 'react';
import { MarketSymbol } from '../types';
import { Star } from 'lucide-react';

interface SymbolTableProps {
  title: string;
  symbols: MarketSymbol[];
  onSelectSymbol: (symbol: MarketSymbol) => void;
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  seeAllText?: string;
  onSeeAllClick?: () => void;
}

export const SymbolTable: React.FC<SymbolTableProps> = ({
  title,
  symbols,
  onSelectSymbol,
  favorites,
  onToggleFavorite,
  seeAllText = 'See all major indices',
  onSeeAllClick,
}) => {
  return (
    <div className="mb-12">
      <h3 className="font-headline-md text-headline-md text-[#171b26] dark:text-[#f0f3fa] mb-4">
        {title}
      </h3>

      <div className="overflow-x-auto rounded-lg border border-[#E0E3EB] dark:border-[#2a2e39] bg-white dark:bg-[#1e222d]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E0E3EB] dark:border-[#2a2e39] text-[#737687] dark:text-[#a3a6af] font-label-sm text-label-sm bg-[#faf8ff] dark:bg-[#131722]">
              <th className="py-2.5 px-4 font-normal">Symbol</th>
              <th className="py-2.5 px-4 font-normal text-right">Price</th>
              <th className="py-2.5 px-4 font-normal text-right">Chg %</th>
              <th className="py-2.5 px-4 font-normal text-right hidden sm:table-cell">High / Low</th>
              <th className="py-2.5 px-4 font-normal text-center w-12"></th>
            </tr>
          </thead>
          <tbody className="font-data-tabular text-data-tabular divide-y divide-[#E0E3EB] dark:divide-[#2a2e39]">
            {symbols.map((item) => {
              const isNegative = item.change < 0;
              const isFav = favorites.includes(item.id);

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectSymbol(item)}
                  className="hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39] transition-colors cursor-pointer group"
                >
                  {/* Symbol & Name */}
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    {item.flagUrl ? (
                      <img
                        src={item.flagUrl}
                        alt={item.name}
                        className="w-6 h-6 rounded-full object-cover shrink-0 border border-[#E0E3EB]"
                      />
                    ) : item.badge ? (
                      <div
                        style={{ backgroundColor: item.badgeBg || '#00A1E0' }}
                        className="w-6 h-6 rounded-full text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                      >
                        {item.badge}
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-[#dfe2f2] dark:bg-[#363a45] text-[#171b26] dark:text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {item.symbol.substring(0, 2)}
                      </div>
                    )}

                    <div className="flex flex-col">
                      <span className="text-[#171b26] dark:text-[#f0f3fa] group-hover:text-[#0049db] dark:group-hover:text-[#b6c4ff] font-semibold transition-colors">
                        {item.symbol}
                      </span>
                      <span className="font-body-md text-[12px] text-[#737687] dark:text-[#a3a6af] font-normal truncate max-w-[180px] md:max-w-[300px]">
                        {item.name}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-4 text-right text-[#171b26] dark:text-[#f0f3fa] font-semibold">
                    {item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>

                  {/* Change % */}
                  <td
                    className={`py-3.5 px-4 text-right font-semibold ${
                      isNegative ? 'text-[#F23645]' : 'text-[#089981]'
                    }`}
                  >
                    {isNegative ? '−' : '+'}{Math.abs(item.changePercent).toFixed(2)}%
                  </td>

                  {/* High / Low */}
                  <td className="py-3.5 px-4 text-right text-[12px] text-[#737687] dark:text-[#a3a6af] hidden sm:table-cell">
                    {item.high ? `${item.high.toFixed(2)} / ${item.low?.toFixed(2)}` : '—'}
                  </td>

                  {/* Watchlist Star */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={(e) => onToggleFavorite(item.id, e)}
                      title={isFav ? "Remove from watchlist" : "Add to watchlist"}
                      className="p-1 rounded hover:bg-[#dfe2f2] dark:hover:bg-[#363a45] transition-colors"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          isFav ? 'fill-amber-400 text-amber-400' : 'text-[#737687] hover:text-[#171b26]'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {seeAllText && (
        <button
          onClick={onSeeAllClick}
          className="inline-block mt-4 font-body-md text-body-md text-[#0049db] dark:text-[#b6c4ff] hover:underline font-semibold cursor-pointer"
        >
          {seeAllText}
        </button>
      )}
    </div>
  );
};
