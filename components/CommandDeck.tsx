import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Copy, Download, Terminal, X } from 'lucide-react';
import { navigationItems, type RouteKey } from '../data/portfolio';

interface CommandDeckProps {
  isOpen: boolean;
  activeRoute: RouteKey;
  onClose: () => void;
  onNavigate: (route: RouteKey) => void;
  onDownloadBrief: () => void;
  onCopyEmail: () => void;
}

export const CommandDeck: React.FC<CommandDeckProps> = ({
  isOpen,
  activeRoute,
  onClose,
  onNavigate,
  onDownloadBrief,
  onCopyEmail,
}) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-background-dark/80 px-4 py-24 backdrop-blur-xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="panel-shell relative w-full max-w-4xl rounded-[28px] border border-white/10"
          >
            <button
              type="button"
              onClick={onClose}
              className="focus-ring absolute right-4 top-4 flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition-colors hover:border-primary/40 hover:text-primary"
              aria-label="Close command deck"
            >
              <X className="size-5" />
            </button>

            <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.35em] text-primary">
                    <Terminal className="size-3.5" />
                    SSH Access
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                      Launch a route, export the brief, or copy the secure intake channel.
                    </h2>
                    <p className="max-w-2xl text-base leading-7 text-slate-400">
                      This command deck mirrors the same portfolio workflow as the top navigation, but lets visitors
                      jump faster. Use <span className="font-mono text-primary">Ctrl/Cmd + K</span> from anywhere.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {navigationItems.map((item) => {
                    const isActive = item.key === activeRoute;

                    return (
                      <motion.button
                        key={item.key}
                        whileHover={{ x: 6 }}
                        type="button"
                        onClick={() => onNavigate(item.key)}
                        className={`focus-ring flex items-center justify-between rounded-2xl border px-4 py-4 text-left transition-all ${
                          isActive
                            ? 'border-primary/40 bg-primary/10 text-white shadow-[0_0_30px_rgba(0,194,204,0.12)]'
                            : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/[0.08]'
                        }`}
                      >
                        <div className="space-y-1">
                          <p className="font-mono text-sm uppercase tracking-[0.3em] text-primary/80">{item.label}</p>
                          <p className="text-sm text-slate-400">{item.description}</p>
                        </div>
                        <ArrowRight className="size-4 shrink-0 text-primary" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500">Quick Actions</p>
                  <div className="mt-5 grid gap-3">
                    <button
                      type="button"
                      onClick={onDownloadBrief}
                      className="focus-ring flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-4 text-left text-white transition-all hover:bg-primary/15"
                    >
                      <div>
                        <p className="font-semibold">Download Ops Brief</p>
                        <p className="mt-1 text-sm text-slate-300">Export portfolio highlights as a local JSON briefing file.</p>
                      </div>
                      <Download className="size-5 text-primary" />
                    </button>

                    <button
                      type="button"
                      onClick={onCopyEmail}
                      className="focus-ring flex items-center justify-between rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-4 text-left text-white transition-all hover:border-white/20"
                    >
                      <div>
                        <p className="font-semibold">Copy Secure Mail</p>
                        <p className="mt-1 text-sm text-slate-400">Drop the intake address into your preferred encrypted workflow.</p>
                      </div>
                      <Copy className="size-5 text-primary" />
                    </button>
                  </div>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5">
                  <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500">Session</p>
                  <div className="mt-5 space-y-4 text-sm text-slate-400">
                    <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                      <span>Active route</span>
                      <span className="font-mono uppercase tracking-[0.25em] text-primary">
                        {navigationItems.find((item) => item.key === activeRoute)?.label ?? '/home'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                      <span>Mode</span>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-400">
                        interactive
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Hotkey</span>
                      <span className="font-mono uppercase tracking-[0.25em] text-slate-300">Ctrl/Cmd + K</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
