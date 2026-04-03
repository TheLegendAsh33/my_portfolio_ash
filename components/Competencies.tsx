import React from 'react';
import { motion } from 'framer-motion';
import { Layers3, ShieldAlert, TrendingUp } from 'lucide-react';
import { competencyItems } from '../data/portfolio';
import { SectionHeading } from './SectionHeading';

const icons = [TrendingUp, Layers3, ShieldAlert];

const toneStyles = {
  cyan: {
    stroke: '#00c2cc',
    badge: 'border-primary/20 bg-primary/10 text-primary',
  },
  violet: {
    stroke: '#a855f7',
    badge: 'border-accent-purple/20 bg-accent-purple/10 text-accent-purple',
  },
  emerald: {
    stroke: '#10b981',
    badge: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
  },
  amber: {
    stroke: '#f59e0b',
    badge: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
  },
};

export const Competencies: React.FC = () => {
  return (
    <section className="section-shell">
      <div className="page-shell flex flex-col gap-10">
        <SectionHeading
          eyebrow="Core Competencies"
          title="Deep security expertise with a workflow bias toward speed, clarity, and repeatability."
          description="These are the areas where secure delivery programs usually accelerate the fastest when the right controls and automation are put in place."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {competencyItems.map((item, index) => {
            const Icon = icons[index % icons.length];
            const tone = toneStyles[item.tone];

            return (
              <motion.article
                key={item.title}
                whileHover={{ y: -6 }}
                className="panel-shell rounded-[32px] p-6 text-center sm:p-8"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="relative size-36">
                    <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="transparent" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="transparent"
                        stroke={tone.stroke}
                        strokeLinecap="round"
                        strokeWidth="6"
                        strokeDasharray="264"
                        initial={{ strokeDashoffset: 264 }}
                        whileInView={{ strokeDashoffset: 264 - (264 * item.percentage) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: 'easeOut', delay: 0.15 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black leading-none text-white">{item.percentage}%</span>
                      <span className="mt-1 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">Ready</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">{item.title}</h3>
                    <p className="text-sm leading-7 text-slate-400">{item.description}</p>
                  </div>

                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.25em] ${tone.badge}`}>
                    <span className="size-2 rounded-full bg-current opacity-80" />
                    {item.stat}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
