import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface HeroHeaderProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ selectedRegion, onSelectRegion }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const regions = [
    { id: 'global', name: 'Markets, everywhere' },
    { id: 'americas', name: 'Markets, Americas' },
    { id: 'europe', name: 'Markets, Europe' },
    { id: 'asia', name: 'Markets, Asia Pacific' },
    { id: 'crypto', name: 'Markets, Crypto 24/7' },
  ];

  const currentRegionLabel = regions.find(r => r.id === selectedRegion)?.name || 'Markets, everywhere';

  return (
    <section className="text-center my-6 md:my-10 flex flex-col items-center relative">
      <div className="relative inline-block">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="font-display-hero text-display-hero text-[#171b26] dark:text-white flex items-center justify-center gap-2 cursor-pointer hover:opacity-85 transition-opacity group select-none"
        >
          <span>{currentRegionLabel}</span>
          <span className="material-symbols-outlined text-[36px] md:text-[48px] group-hover:translate-y-1 transition-transform">
            keyboard_arrow_down
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-xl shadow-xl py-2 z-30 text-left">
            <div className="px-4 py-2 text-[11px] font-semibold text-[#737687] uppercase tracking-wider border-b border-[#E0E3EB] dark:border-[#2a2e39]">
              Filter Market Region
            </div>
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  onSelectRegion(r.id);
                  setDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium text-[#171b26] dark:text-[#f0f3fa] hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39] transition-colors"
              >
                <span>{r.name}</span>
                {selectedRegion === r.id && <Check className="w-4 h-4 text-[#0049db]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
