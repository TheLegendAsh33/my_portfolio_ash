import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Cloud, GitBranch, ShieldCheck, TerminalSquare } from 'lucide-react';
import { heroMetrics, type RouteKey } from '../data/portfolio';

interface HeroProps {
  onNavigate: (route: RouteKey) => void;
  onOpenCommandDeck: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenCommandDeck }) => {
  return (
    <section className="relative overflow-hidden px-4 pb-8 pt-10 sm:px-6 md:pt-16 lg:px-10">
      <div className="page-shell relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="flex flex-col gap-8"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.35em] text-primary">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            Active Security Protocol v4.2
          </div>

          <div className="space-y-5">
            <h2 className="fluid-heading text-balance font-black leading-[1.02] tracking-tight text-white">
              Securing the cloud,
              <br />
              <span className="animate-gradient-flow bg-gradient-to-r from-primary via-accent-purple to-primary bg-[length:200%_100%] bg-clip-text text-transparent">
                one pipeline at a time
              </span>
            </h2>
            <p className="fluid-copy max-w-2xl text-pretty font-light leading-8 text-slate-400">
              DevSecOps architect specializing in automated assurance, hardened cloud foundations, resilient Kubernetes
              operations, and reporting systems that turn risk into clear engineering action.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => onNavigate('infrastructure')}
              className="focus-ring inline-flex h-14 items-center gap-2 rounded-2xl border border-primary/30 bg-primary px-7 text-base font-bold text-background-dark shadow-[0_0_26px_rgba(0,194,204,0.22)]"
            >
              View Infrastructure
              <ArrowRight className="size-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onOpenCommandDeck}
              className="focus-ring inline-flex h-14 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-7 text-base font-semibold text-white transition-colors hover:border-white/20 hover:bg-white/[0.08]"
            >
              Access Bio.sh
              <TerminalSquare className="size-5 text-primary" />
            </motion.button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {heroMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 * index }}
                className="panel-shell rounded-[24px] p-5"
              >
                <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-slate-500">{metric.label}</p>
                <p className="mt-4 text-4xl font-black tracking-tight text-white">{metric.value}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{metric.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.12, ease: 'easeOut' }}
          className="panel-shell relative min-h-[540px] rounded-[36px] p-5 sm:p-7"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500">Pipeline Visualization</p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">Protected delivery path</h3>
            </div>
            <div className="flex gap-2">
              <span className="size-2.5 rounded-full bg-rose-500/60" />
              <span className="size-2.5 rounded-full bg-amber-500/60" />
              <span className="size-2.5 rounded-full bg-emerald-500/60" />
            </div>
          </div>

          <div className="relative mt-8 flex min-h-[260px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-background-dark/70">
            <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 600 360" fill="none">
              <motion.path
                d="M50 230 C 150 230, 180 70, 290 70 S 420 180, 550 180"
                stroke="#00c2cc"
                strokeWidth="2"
                strokeDasharray="12 9"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
              />
              <motion.path
                d="M50 230 C 140 230, 190 300, 300 300 S 430 180, 550 180"
                stroke="#a855f7"
                strokeWidth="2"
                strokeDasharray="12 9"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
              />
            </svg>

            <div className="absolute left-[10%] top-[38%] flex size-16 items-center justify-center rounded-3xl border border-primary/35 bg-panel-dark/90 text-primary shadow-[0_0_24px_rgba(0,194,204,0.12)]">
              <GitBranch className="size-8" />
            </div>
            <div className="absolute right-[12%] top-[30%] flex size-16 items-center justify-center rounded-3xl border border-accent-purple/35 bg-panel-dark/90 text-accent-purple shadow-[0_0_24px_rgba(168,85,247,0.12)]">
              <Cloud className="size-8" />
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex size-20 items-center justify-center rounded-[28px] border border-white/10 bg-white/[0.04] text-white"
            >
              <ShieldCheck className="size-9 text-primary" />
            </motion.div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center gap-3">
                <Activity className="size-5 text-primary" />
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">Live Status</p>
                  <p className="mt-1 text-lg font-semibold text-white">All control gates online</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm leading-6 text-slate-400">
                <p>&gt; security_scan: completed in 1.4s</p>
                <p>&gt; policy_check: passed with 32 guardrails</p>
                <p>&gt; deployment_lane: staging ready</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">Coverage</p>
              <div className="mt-4 grid gap-3">
                {[
                  'SAST, secrets, and dependency checks on every pull request',
                  'Signed images enforced before runtime admission',
                  'Drift telemetry routed into remediation dashboards',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3 text-sm text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
