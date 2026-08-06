import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Zap, TrendingUp } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GetStartedModal: React.FC<GetStartedModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="bg-white dark:bg-[#1e222d] border border-[#E0E3EB] dark:border-[#2a2e39] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#737687] hover:text-[#171b26] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2a2e39]"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-[#0049db] mb-2">
              <TrendingUp className="w-6 h-6" />
              <span className="font-bold font-display-hero text-lg">TradingView Account</span>
            </div>
            <h3 className="text-2xl font-bold font-display-hero text-[#171b26] dark:text-white mb-2">
              Start tracking markets everywhere
            </h3>
            <p className="text-sm text-[#737687] mb-6">
              Get access to real-time quotes, custom watchlists, technical charts, and price alerts across global exchanges.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#737687] uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E0E3EB] dark:border-[#2a2e39] bg-[#faf8ff] dark:bg-[#131722] text-[#171b26] dark:text-white focus:outline-none focus:border-[#0049db] text-sm font-body-md"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2962ff] text-white font-semibold py-3 rounded-xl hover:bg-[#0049db] transition-colors text-sm shadow-md cursor-pointer"
              >
                Create free account
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#E0E3EB] dark:border-[#2a2e39] space-y-2 text-xs text-[#737687]">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>Zero spam guarantee • Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant access to 100,000+ financial symbols</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <h3 className="text-2xl font-bold font-display-hero text-[#171b26] dark:text-white">
              Welcome aboard!
            </h3>
            <p className="text-sm text-[#737687]">
              We've created your TradingView profile for <strong className="text-[#171b26] dark:text-white">{email}</strong>. Your watchlists and preferences will sync automatically.
            </p>
            <button
              onClick={onClose}
              className="bg-[#2962ff] text-white font-semibold px-6 py-2.5 rounded-xl text-sm"
            >
              Continue exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
