import React, { useState } from 'react';
import { Search, Globe, User, Moon, Sun, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenAuth,
  isDarkMode,
  toggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const languages = ['EN', 'ES', 'DE', 'FR', 'JP', 'ZH'];

  return (
    <header className="bg-[#faf8ff] dark:bg-[#131722] sticky top-0 z-40 w-full border-b border-[#E0E3EB] dark:border-[#2a2e39] transition-colors">
      <div className="flex justify-between items-center h-[56px] px-4 md:px-8 w-full max-w-[1280px] mx-auto">
        <div className="flex items-center gap-6">
          {/* Brand Logo */}
          <a className="font-display-hero text-[20px] text-[#171b26] dark:text-[#f0f3fa] flex items-center gap-2 group" href="#">
            <svg fill="none" height="26" viewBox="0 0 36 26" width="36" xmlns="http://www.w3.org/2000/svg" className="text-[#171b26] dark:text-[#f0f3fa] transition-colors">
              <path clipRule="evenodd" d="M11.9686 0L19.2604 0L13.1118 25.8073L5.81995 25.8073L11.9686 0ZM4.53857 0H0V7.27964H4.53857V0ZM30.7303 0L36 7.27964L24.8436 25.8073L19.5739 25.8073L30.7303 0Z" fill="currentColor" fillRule="evenodd"></path>
            </svg>
          </a>

          {/* Search Bar */}
          <button 
            onClick={onOpenSearch}
            className="hidden md:flex items-center bg-[#F0F3FA] dark:bg-[#2a2e39] rounded-full px-4 py-1.5 w-64 border border-transparent hover:border-[#0049db] focus:border-[#0049db] transition-all cursor-pointer group"
          >
            <Search className="w-4 h-4 text-[#737687] group-hover:text-[#171b26] dark:group-hover:text-white transition-colors mr-2" />
            <span className="text-[14px] text-[#737687] dark:text-[#a3a6af] flex-grow text-left">Search</span>
            <div className="flex items-center justify-center bg-[#dfe2f2] dark:bg-[#363a45] rounded px-1.5 h-5 ml-2">
              <span className="text-[11px] font-semibold text-[#737687] dark:text-[#a3a6af]">Ctrl+K</span>
            </div>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-[14px] font-body-md h-full">
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] transition-colors flex items-center h-full" href="#products">Products</a>
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] transition-colors flex items-center h-full" href="#community">Community</a>
          <a className="text-[#0049db] dark:text-[#b6c4ff] border-b-2 border-[#0049db] dark:border-[#b6c4ff] pb-0.5 flex items-center h-full font-semibold" href="#markets">Markets</a>
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] transition-colors flex items-center h-full" href="#brokers">Brokers</a>
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] transition-colors flex items-center h-full" href="#more">More</a>
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={toggleDarkMode} 
            title="Toggle theme"
            className="p-2 text-[#434656] dark:text-[#a3a6af] hover:text-[#171b26] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39] rounded-full transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="text-[#434656] dark:text-[#a3a6af] hover:text-[#171b26] dark:hover:text-white transition-colors flex items-center gap-1 text-[14px] px-2 py-1.5 rounded hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39]"
            >
              <Globe className="w-4 h-4" />
              <span>{selectedLang}</span>
            </button>
            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] rounded-lg shadow-lg py-1 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setSelectedLang(lang); setShowLangMenu(false); }}
                    className="w-full text-left px-3 py-1.5 text-[13px] text-[#171b26] dark:text-[#f0f3fa] hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39]"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile / Search trigger on mobile */}
          <button 
            onClick={onOpenSearch}
            className="md:hidden p-2 text-[#434656] dark:text-[#a3a6af] hover:text-[#171b26]"
          >
            <Search className="w-5 h-5" />
          </button>

          <button 
            onClick={onOpenAuth}
            className="text-[#434656] dark:text-[#a3a6af] hover:text-[#171b26] dark:hover:text-white p-2 rounded-full hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39] transition-colors"
          >
            <User className="w-5 h-5" />
          </button>

          <button 
            onClick={onOpenAuth}
            className="bg-[#2962ff] text-white font-body-md font-semibold px-4 py-1.5 rounded-full hover:bg-[#0049db] transition-colors hidden md:block text-[14px] shadow-sm"
          >
            Get started
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#434656] dark:text-[#a3a6af]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E0E3EB] dark:border-[#2a2e39] bg-[#faf8ff] dark:bg-[#131722] px-4 py-4 flex flex-col gap-3">
          <a className="text-[15px] font-medium text-[#171b26] dark:text-[#f0f3fa] py-2" href="#products">Products</a>
          <a className="text-[15px] font-medium text-[#171b26] dark:text-[#f0f3fa] py-2" href="#community">Community</a>
          <a className="text-[15px] font-semibold text-[#0049db] dark:text-[#b6c4ff] py-2" href="#markets">Markets</a>
          <a className="text-[15px] font-medium text-[#171b26] dark:text-[#f0f3fa] py-2" href="#brokers">Brokers</a>
          <a className="text-[15px] font-medium text-[#171b26] dark:text-[#f0f3fa] py-2" href="#more">More</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
            className="w-full bg-[#2962ff] text-white font-semibold py-2.5 rounded-full mt-2"
          >
            Get started
          </button>
        </div>
      )}
    </header>
  );
};
