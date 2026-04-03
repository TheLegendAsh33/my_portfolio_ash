import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, Shield, Terminal, X } from 'lucide-react';
import { navigationItems, type RouteKey } from '../data/portfolio';

interface HeaderProps {
  activeRoute: RouteKey;
  onNavigate: (route: RouteKey) => void;
  onDownloadBrief: () => void;
  onToggleCommandDeck: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRoute,
  onNavigate,
  onDownloadBrief,
  onToggleCommandDeck,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [activeRoute]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background-dark/75 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-10">
      <div className="page-shell flex items-center justify-between gap-4">
        <button type="button" onClick={() => onNavigate('home')} className="focus-ring flex items-center gap-3 text-left">
          <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-[0_0_18px_rgba(0,194,204,0.15)]">
            <Shield className="size-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white sm:text-lg">ASHISH_SHINDE</h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-primary/80">System Operational</p>
          </div>
        </button>

        <nav className="hidden items-center gap-2 xl:flex">
          {navigationItems.map((item) => {
            const isActive = item.key === activeRoute;

            return (
              <motion.button
                key={item.key}
                whileHover={{ y: -2 }}
                type="button"
                onClick={() => onNavigate(item.key)}
                className={`focus-ring rounded-full border px-4 py-2 text-sm font-mono uppercase tracking-[0.2em] transition-all ${
                  isActive
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                {item.label}
              </motion.button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onToggleCommandDeck}
            className="focus-ring hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/[0.08] md:inline-flex"
          >
            <Terminal className="size-4 text-primary" />
            SSH Access
          </button>
          <button
            type="button"
            onClick={onDownloadBrief}
            className="focus-ring hidden items-center gap-2 rounded-2xl border border-primary/30 bg-primary px-4 py-3 text-sm font-bold text-background-dark shadow-[0_0_20px_rgba(0,194,204,0.2)] sm:inline-flex"
          >
            <Download className="size-4" />
            Download Brief
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="focus-ring inline-flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-200 transition-all hover:border-white/20 xl:hidden"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="page-shell mt-4 xl:hidden"
          >
            <div className="panel-shell rounded-[28px] p-4">
              <div className="grid gap-3">
                {navigationItems.map((item) => {
                  const isActive = item.key === activeRoute;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onNavigate(item.key)}
                      className={`focus-ring rounded-2xl border px-4 py-4 text-left transition-all ${
                        isActive
                          ? 'border-primary/40 bg-primary/10'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
                      }`}
                    >
                      <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary/80">{item.label}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={onToggleCommandDeck}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3 text-sm font-semibold text-white"
                >
                  <Terminal className="size-4 text-primary" />
                  Open Command Deck
                </button>
                <button
                  type="button"
                  onClick={onDownloadBrief}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl border border-primary/30 bg-primary px-4 py-3 text-sm font-bold text-background-dark"
                >
                  <Download className="size-4" />
                  Download Brief
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
