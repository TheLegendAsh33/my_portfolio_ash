import React from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Shield } from 'lucide-react';
import { navigationItems, type RouteKey } from '../data/portfolio';

interface FooterProps {
  activeRoute: RouteKey;
  onNavigate: (route: RouteKey) => void;
  onCopyEmail: () => void;
  onDownloadBrief: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  activeRoute,
  onNavigate,
  onCopyEmail,
  onDownloadBrief,
}) => {
  return (
    <footer className="mt-10 border-t border-white/5 bg-panel-dark/30 px-4 pb-8 pt-14 sm:px-6 lg:px-10">
      <div className="page-shell grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
              <Shield className="size-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">Secure.Deploy.Monitor</h3>
              <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-primary/80">Persistent posture with fast delivery</p>
            </div>
          </div>

          <p className="max-w-2xl text-sm leading-7 text-slate-400">
            Built as a responsive, animated portfolio for a DevSecOps engineer focused on delivery safety, cloud
            resilience, and reporting systems that engineering teams actually use.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={onCopyEmail}
              className="focus-ring inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left transition-all hover:border-white/20"
            >
              <div>
                <p className="font-semibold text-white">Copy secure email</p>
                <p className="mt-1 text-sm text-slate-400">secure@vulnscanner.dev</p>
              </div>
              <Copy className="size-4 text-primary" />
            </button>
            <button
              type="button"
              onClick={onDownloadBrief}
              className="focus-ring inline-flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-4 text-left transition-all hover:bg-primary/15"
            >
              <div>
                <p className="font-semibold text-white">Download ops brief</p>
                <p className="mt-1 text-sm text-slate-300">Export the current portfolio packet.</p>
              </div>
              <Download className="size-4 text-primary" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500">Navigation</p>
            <div className="mt-5 grid gap-3">
              {navigationItems.map((item) => {
                const isActive = item.key === activeRoute;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onNavigate(item.key)}
                    className={`focus-ring rounded-2xl border px-4 py-3 text-left transition-all ${
                      isActive
                        ? 'border-primary/35 bg-primary/10 text-primary'
                        : 'border-white/10 bg-background-dark/55 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.28em]">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <motion.div whileHover={{ y: -4 }} className="panel-shell rounded-[28px] p-6">
            <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500">Location Beacon</p>
            <div className="relative mt-5 min-h-[220px] overflow-hidden rounded-[24px] border border-white/10 bg-background-dark/70">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,194,204,0.12),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_48%)]" />
              <div className="absolute inset-6 rounded-full border border-primary/15" />
              <div className="absolute inset-12 rounded-full border border-accent-purple/10" />
              <div className="absolute left-[56%] top-[44%] flex size-10 items-center justify-center rounded-full border border-primary/30 bg-primary/15 shadow-[0_0_24px_rgba(0,194,204,0.22)]">
                <span className="size-3 rounded-full bg-primary" />
              </div>
              <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-panel-dark/80 px-4 py-3">
                <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary/80">Current Loc</p>
                <p className="mt-2 text-sm text-white">Distributed delivery / India</p>
                <p className="mt-1 text-xs font-mono uppercase tracking-[0.22em] text-slate-500">UTC+05:30 hardened systems</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="page-shell mt-10 flex flex-col gap-3 border-t border-white/5 pt-6 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 DevSecOps Architect // responsive portfolio build</p>
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            Status: Optimal
          </span>
          <span>Encrypted: AES-256-GCM</span>
        </div>
      </div>
    </footer>
  );
};
