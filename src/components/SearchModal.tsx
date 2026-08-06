import React, { useState, useEffect } from 'react';
import { MarketSymbol } from '../types';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  symbols: MarketSymbol[];
  onSelectSymbol: (symbol: MarketSymbol) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  symbols,
  onSelectSymbol,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredSymbols = symbols.filter(
    (s) =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#E0E3EB] dark:border-[#2a2e39] flex items-center gap-3 bg-[#faf8ff] dark:bg-[#131722]">
          <Search className="w-5 h-5 text-[#737687]" />
          <input
            type="text"
            autoFocus
            placeholder="Search markets, stocks, crypto, forex, indices (Ctrl+K)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-[#171b26] dark:text-white placeholder-[#737687] text-base font-body-md"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-[#737687] hover:text-[#171b26]">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-xs font-semibold px-2.5 py-1 bg-[#dfe2f2] dark:bg-[#363a45] text-[#737687] rounded">
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#E0E3EB] dark:divide-[#2a2e39]">
          {filteredSymbols.length > 0 ? (
            filteredSymbols.map((item) => {
              const isNegative = item.change < 0;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectSymbol(item);
                    onClose();
                  }}
                  className="p-3.5 px-5 flex items-center justify-between hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#dfe2f2] dark:bg-[#363a45] font-bold text-xs flex items-center justify-center shrink-0 text-[#171b26] dark:text-white">
                      {item.symbol.substring(0, 3)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#171b26] dark:text-white group-hover:text-[#0049db] dark:group-hover:text-[#b6c4ff]">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#dfe2f2] dark:bg-[#363a45] text-[#737687]">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#737687] truncate max-w-xs">{item.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-data-tabular">
                      <div className="font-bold text-sm text-[#171b26] dark:text-white">
                        ${item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className={`text-xs font-semibold ${isNegative ? 'text-[#F23645]' : 'text-[#089981]'}`}>
                        {isNegative ? '−' : '+'}{Math.abs(item.changePercent).toFixed(2)}%
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#737687] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-[#737687] text-sm">
              No matching markets or symbols found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
