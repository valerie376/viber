import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#faf8ff] dark:bg-[#131722] w-full border-t border-[#E0E3EB] dark:border-[#2a2e39] mt-auto transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-8 w-full max-w-[1280px] mx-auto gap-4">
        <div className="font-headline-md text-headline-md text-[#171b26] dark:text-[#f0f3fa]">
          © 2024 TradingView, Inc.
        </div>
        <nav className="flex flex-wrap justify-center gap-6 font-body-md text-body-md text-[14px]">
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] hover:underline cursor-pointer transition-all" href="#">Features</a>
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] hover:underline cursor-pointer transition-all" href="#">News</a>
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] hover:underline cursor-pointer transition-all" href="#">Pricing</a>
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] hover:underline cursor-pointer transition-all" href="#">Help Center</a>
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] hover:underline cursor-pointer transition-all" href="#">Terms of Use</a>
          <a className="text-[#434656] dark:text-[#a3a6af] hover:text-[#0049db] dark:hover:text-[#b6c4ff] hover:underline cursor-pointer transition-all" href="#">Privacy Policy</a>
        </nav>
      </div>
    </footer>
  );
};
