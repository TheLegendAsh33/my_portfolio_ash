import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Cloud, Lock, Radar, ShieldCheck } from 'lucide-react';
import { infrastructureViews, type RouteKey } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

interface InfrastructurePageProps {
  onNavigate: (route: RouteKey) => void;
}

export const InfrastructurePage: React.FC<InfrastructurePageProps> = ({ onNavigate }) => {
  const [activeViewId, setActiveViewId] = useState(infrastructureViews[0].id);
  const activeView = infrastructureViews.find((view) => view.id === activeViewId) ?? infrastructureViews[0];

  return (
    <section className="section-shell">
      <div className="page-shell flex flex-col gap-10">
        <SectionHeading
          eyebrow="Infrastructure Blueprint"
          title="Cloud foundations, runtime controls, and evidence pipelines built as one system."
          description="This view shows how the platform is layered so identity, deployment safety, and telemetry reinforce each other instead of living in separate tooling silos."
          action={
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => onNavigate('contact')}
              className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary px-5 py-3 text-sm font-bold text-background-dark shadow-[0_0_24px_rgba(0,194,204,0.25)]"
            >
              Discuss Platform Hardening
              <ArrowRight className="size-4" />
            </motion.button>
          }
        />

        <div className="flex flex-wrap gap-3">
          {infrastructureViews.map((view) => {
            const isActive = view.id === activeView.id;

            return (
              <button
                key={view.id}
                type="button"
                onClick={() => setActiveViewId(view.id)}
                className={`focus-ring rounded-full border px-4 py-2 text-sm font-mono uppercase tracking-[0.25em] transition-all ${
                  isActive
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {view.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            key={activeView.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="panel-shell rounded-[32px] p-6 sm:p-8"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.35em] text-primary">
                  <Cloud className="size-3.5" />
                  {activeView.label}
                </div>
                <h3 className="text-3xl font-black tracking-tight text-white">{activeView.strapline}</h3>
                <p className="max-w-3xl text-base leading-7 text-slate-400">{activeView.summary}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {activeView.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                  >
                    <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">{metric.label}</p>
                    <p className="mt-4 text-4xl font-black tracking-tight text-white">{metric.value}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{metric.detail}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <div className="rounded-[28px] border border-white/10 bg-background-dark/60 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <ShieldCheck className="size-5 text-primary" />
                    <h4 className="text-lg font-semibold text-white">Control Layers</h4>
                  </div>
                  <div className="grid gap-4">
                    {activeView.controls.map((control) => (
                      <div key={control} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-slate-300">
                        {control}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-background-dark/60 p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <Lock className="size-5 text-primary" />
                    <h4 className="text-lg font-semibold text-white">Delivery Pipeline</h4>
                  </div>
                  <div className="grid gap-4">
                    {activeView.pipeline.map((step, index) => (
                      <div key={step} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                        <p className="text-sm leading-6 text-slate-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div className="panel-shell rounded-[32px] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500">Protected Delivery Path</p>
                  <h4 className="mt-3 text-2xl font-bold tracking-tight text-white">Controls travel with the workload.</h4>
                </div>
                <Radar className="size-6 text-primary" />
              </div>

              <div className="relative mt-8 flex min-h-[280px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-background-dark/70">
                <div className="absolute size-52 rounded-full border border-primary/20" />
                <div className="absolute size-72 rounded-full border border-accent-purple/15" />
                <div className="absolute h-56 w-56 animate-[radar-spin_12s_linear_infinite] rounded-full border-t border-primary/60" />
                <div className="absolute left-[16%] top-[22%] flex size-14 items-center justify-center rounded-2xl border border-primary/30 bg-panel-dark/80 text-primary shadow-[0_0_24px_rgba(0,194,204,0.12)]">
                  <Cloud className="size-6" />
                </div>
                <div className="absolute right-[16%] top-[28%] flex size-14 items-center justify-center rounded-2xl border border-accent-purple/30 bg-panel-dark/80 text-accent-purple shadow-[0_0_24px_rgba(168,85,247,0.12)]">
                  <ShieldCheck className="size-6" />
                </div>
                <div className="absolute bottom-[18%] flex size-16 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] text-slate-200">
                  <Lock className="size-7" />
                </div>
              </div>
            </div>

            <div className="panel-shell rounded-[32px] p-6">
              <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500">Next Actions</p>
              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('reports')}
                  className="focus-ring flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left transition-all hover:border-white/20"
                >
                  <div>
                    <p className="font-semibold text-white">View remediation flow</p>
                    <p className="mt-1 text-sm text-slate-400">Open live vulnerability reporting and SLA snapshots.</p>
                  </div>
                  <ArrowRight className="size-4 text-primary" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="focus-ring flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-4 text-left transition-all hover:bg-primary/15"
                >
                  <div>
                    <p className="font-semibold text-white">Plan an infrastructure review</p>
                    <p className="mt-1 text-sm text-slate-300">Line up a landing-zone or runtime hardening engagement.</p>
                  </div>
                  <ArrowRight className="size-4 text-primary" />
                </button>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};
