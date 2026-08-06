export type MarketCategory = 
  | 'indices' 
  | 'stocks' 
  | 'world-stocks' 
  | 'crypto' 
  | 'futures' 
  | 'forex' 
  | 'bonds' 
  | 'etfs' 
  | 'economy';

export interface PricePoint {
  time: string;
  price: number;
}

export interface TechnicalIndicator {
  name: string;
  value: string | number;
  signal: 'Buy' | 'Strong Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
}

export interface MarketSymbol {
  id: string;
  symbol: string;
  name: string;
  category: MarketCategory;
  price: number;
  change: number;
  changePercent: number;
  badge?: string;
  badgeBg?: string;
  flagUrl?: string;
  currency?: string;
  volume?: string;
  high?: number;
  low?: number;
  open?: number;
  marketCap?: string;
  peRatio?: number;
  high52w?: number;
  low52w?: number;
  sparkline: number[];
  historical: {
    '1D': PricePoint[];
    '5D': PricePoint[];
    '1M': PricePoint[];
    '6M': PricePoint[];
    '1Y': PricePoint[];
  };
  summary: string;
  technicalSignal: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  buyGaugeScore: number; // 0 to 100
}

export interface MarketNews {
  id: string;
  title: string;
  source: string;
  time: string;
  relatedSymbol?: string;
  url?: string;
}
