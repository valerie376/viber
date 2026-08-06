import React, { useState, useEffect } from 'react';
import { MarketSymbol } from '../types';
import { X, Star, Bell, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

interface SymbolDetailModalProps {
  symbol: MarketSymbol | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const SymbolDetailModal: React.FC<SymbolDetailModalProps> = ({
  symbol,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!symbol) return null;

  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y'>('1D');
  const [hoveredPoint, setHoveredPoint] = useState<{ time: string; price: number } | null>(null);
  const [isLiveActive, setIsLiveActive] = useState(true);
  const [livePrice, setLivePrice] = useState(symbol.price);
  const [alertSet, setAlertSet] = useState(false);

  // Sync live price when symbol changes
  useEffect(() => {
    setLivePrice(symbol.price);
  }, [symbol]);

  // Live simulation tick effect
  useEffect(() => {
    if (!isLiveActive) return;
    const interval = setInterval(() => {
      setLivePrice((prev) => {
        const delta = (Math.random() - 0.48) * (prev * 0.001);
        return Math.max(0.01, prev + delta);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  const historicalData = symbol.historical[timeframe] || symbol.historical['1D'];
  const isNegative = symbol.change < 0;

  // Chart calculation
  const prices = historicalData.map((d) => d.price);
  const minPrice = Math.min(...prices) * 0.998;
  const maxPrice = Math.max(...prices) * 1.002;
  const priceRange = maxPrice - minPrice || 1;

  const svgWidth = 600;
  const svgHeight = 220;

  const chartPoints = historicalData.map((d, i) => {
    const x = (i / (historicalData.length - 1)) * svgWidth;
    const y = svgHeight - ((d.price - minPrice) / priceRange) * (svgHeight - 20) - 10;
    return { x, y, price: d.price, time: d.time };
  });

  const polylinePoints = chartPoints.map((p) => `${p.x},${p.y}`).join(' ');
  const areaPoints = `0,${svgHeight} ${polylinePoints} ${svgWidth},${svgHeight}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#E0E3EB] dark:border-[#2a2e39] flex items-center justify-between bg-[#faf8ff] dark:bg-[#131722]">
          <div className="flex items-center gap-4">
            {symbol.badge ? (
              <div
                style={{ backgroundColor: symbol.badgeBg || '#00A1E0' }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
              >
                {symbol.badge}
              </div>
            ) : symbol.flagUrl ? (
              <img src={symbol.flagUrl} alt={symbol.name} className="w-12 h-12 rounded-full object-cover shrink-0 border" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#dfe2f2] dark:bg-[#363a45] text-[#171b26] dark:text-white flex items-center justify-center font-bold text-sm shrink-0">
                {symbol.symbol.substring(0, 3)}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold font-display-hero text-[#171b26] dark:text-white">{symbol.symbol}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-[#dfe2f2] dark:bg-[#363a45] text-[#737687] dark:text-[#a3a6af] font-semibold uppercase">
                  {symbol.category}
                </span>
              </div>
              <p className="text-sm text-[#737687] dark:text-[#a3a6af]">{symbol.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Toggle */}
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isLiveActive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-500 border border-gray-300'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLiveActive ? 'animate-spin' : ''}`} />
              <span>{isLiveActive ? 'LIVE' : 'PAUSED'}</span>
            </button>

            {/* Watchlist Star */}
            <button
              onClick={(e) => onToggleFavorite(symbol.id, e)}
              className="p-2 rounded-lg border border-[#E0E3EB] dark:border-[#2a2e39] hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39] transition-colors"
            >
              <Star className={`w-5 h-5 ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-[#737687]'}`} />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39] text-[#737687] hover:text-[#171b26] dark:hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-grow">
          {/* Price Header & Timeframe Bar */}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-data-tabular text-[#171b26] dark:text-white">
                  {livePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span
                  className={`flex items-center gap-1 font-semibold text-base font-data-tabular ${
                    isNegative ? 'text-[#F23645]' : 'text-[#089981]'
                  }`}
                >
                  {isNegative ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  {isNegative ? '−' : '+'}{Math.abs(symbol.change).toFixed(2)} ({isNegative ? '' : '+'}{symbol.changePercent.toFixed(2)}%)
                </span>
              </div>
              <p className="text-xs text-[#737687] mt-0.5">Real-time market quote • Currency in USD</p>
            </div>

            {/* Timeframe Controls */}
            <div className="flex items-center bg-[#F0F3FA] dark:bg-[#131722] p-1 rounded-lg border border-[#E0E3EB] dark:border-[#2a2e39]">
              {(['1D', '5D', '1M', '6M', '1Y'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => { setTimeframe(tf); setHoveredPoint(null); }}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                    timeframe === tf
                      ? 'bg-white dark:bg-[#2962ff] text-[#0049db] dark:text-white shadow-xs font-bold'
                      : 'text-[#737687] hover:text-[#171b26] dark:hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="relative bg-[#faf8ff] dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl p-4 overflow-hidden">
            {hoveredPoint && (
              <div className="absolute top-3 left-4 bg-white dark:bg-[#1e222d] px-3 py-1.5 rounded-md border border-[#E0E3EB] dark:border-[#2a2e39] shadow-md z-10 text-xs">
                <span className="text-[#737687] mr-2">{hoveredPoint.time}:</span>
                <span className="font-bold font-data-tabular">${hoveredPoint.price.toFixed(2)}</span>
              </div>
            )}

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-56 overflow-visible cursor-crosshair"
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={isNegative ? '#F23645' : '#089981'} stopOpacity="0.25" />
                  <stop offset="100%" stopColor={isNegative ? '#F23645' : '#089981'} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0.25, 0.5, 0.75].map((ratio, i) => (
                <line
                  key={i}
                  x1="0"
                  y1={svgHeight * ratio}
                  x2={svgWidth}
                  y2={svgHeight * ratio}
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-800"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Area Fill */}
              <polygon points={areaPoints} fill="url(#chartGradient)" />

              {/* Polyline */}
              <polyline
                fill="none"
                stroke={isNegative ? '#F23645' : '#089981'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylinePoints}
              />

              {/* Hover Interactive Dots */}
              {chartPoints.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r="6"
                  className="fill-transparent hover:fill-current transition-colors text-[#0049db] dark:text-[#b6c4ff] cursor-pointer"
                  onMouseEnter={() => setHoveredPoint({ time: p.time, price: p.price })}
                />
              ))}
            </svg>
          </div>

          {/* Technical Gauge & Key Stats Split */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Technical Analysis Signal Box */}
            <div className="bg-[#F0F3FA] dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold text-[#737687] uppercase tracking-wider mb-2">Technical Analysis</h4>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-[#171b26] dark:text-white">{symbol.technicalSignal}</span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      symbol.buyGaugeScore > 60
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : symbol.buyGaugeScore < 40
                        ? 'bg-rose-500/10 text-rose-600'
                        : 'bg-amber-500/10 text-amber-600'
                    }`}
                  >
                    Score {symbol.buyGaugeScore}/100
                  </span>
                </div>
              </div>

              {/* Gauge Meter */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden flex my-2">
                <div className="bg-rose-500 h-full w-[30%]" title="Sell" />
                <div className="bg-amber-400 h-full w-[20%]" title="Neutral" />
                <div className="bg-emerald-500 h-full w-[50%]" title="Buy" />
              </div>

              <div className="flex justify-between text-[11px] text-[#737687] font-semibold">
                <span>Strong Sell</span>
                <span>Neutral</span>
                <span>Strong Buy</span>
              </div>
            </div>

            {/* Key Statistics Grid */}
            <div className="md:col-span-2 bg-[#F0F3FA] dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl p-5">
              <h4 className="text-xs font-semibold text-[#737687] uppercase tracking-wider mb-4">Key Statistics</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-[#737687] block mb-1">High</span>
                  <span className="font-bold font-data-tabular text-sm">{symbol.high ? `$${symbol.high}` : '—'}</span>
                </div>
                <div>
                  <span className="text-[#737687] block mb-1">Low</span>
                  <span className="font-bold font-data-tabular text-sm">{symbol.low ? `$${symbol.low}` : '—'}</span>
                </div>
                <div>
                  <span className="text-[#737687] block mb-1">Volume</span>
                  <span className="font-bold font-data-tabular text-sm">{symbol.volume || '—'}</span>
                </div>
                <div>
                  <span className="text-[#737687] block mb-1">Market Cap</span>
                  <span className="font-bold font-data-tabular text-sm">{symbol.marketCap || '—'}</span>
                </div>
                <div>
                  <span className="text-[#737687] block mb-1">52W High</span>
                  <span className="font-bold font-data-tabular text-sm">{symbol.high52w ? `$${symbol.high52w}` : '—'}</span>
                </div>
                <div>
                  <span className="text-[#737687] block mb-1">52W Low</span>
                  <span className="font-bold font-data-tabular text-sm">{symbol.low52w ? `$${symbol.low52w}` : '—'}</span>
                </div>
                <div>
                  <span className="text-[#737687] block mb-1">P/E Ratio</span>
                  <span className="font-bold font-data-tabular text-sm">{symbol.peRatio || '—'}</span>
                </div>
                <div>
                  <span className="text-[#737687] block mb-1">Price Alert</span>
                  <button
                    onClick={() => setAlertSet(!alertSet)}
                    className={`flex items-center gap-1 font-semibold ${alertSet ? 'text-amber-500' : 'text-[#0049db]'}`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{alertSet ? 'Alert On' : 'Set Alert'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Description Box */}
          <div className="border-t border-[#E0E3EB] dark:border-[#2a2e39] pt-4">
            <h4 className="text-xs font-semibold text-[#737687] uppercase tracking-wider mb-2">About {symbol.symbol}</h4>
            <p className="text-sm text-[#434656] dark:text-[#a3a6af] leading-relaxed">{symbol.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
