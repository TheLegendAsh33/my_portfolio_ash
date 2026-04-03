import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { serviceTracks, type RouteKey } from '../data/portfolio';
import { Competencies } from './Competencies';
import { Hero } from './Hero';
import { SectionHeading } from './SectionHeading';
import { TerminalSection } from './TerminalSection';

interface HomePageProps {
  onNavigate: (route: RouteKey) => void;
  onOpenCommandDeck: () => void;
  onCopySignal: () => void;
}

const toneClasses: Record<string, string> = {
  cyan: 'border-primary/20 bg-primary/10 text-primary',
  violet: 'border-accent-purple/20 bg-accent-purple/10 text-accent-purple',
  emerald: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400',
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenCommandDeck, onCopySignal }) => {
  return (
    <div className="flex flex-col">
      <Hero onNavigate={onNavigate} onOpenCommandDeck={onOpenCommandDeck} />
      <TerminalSection onNavigate={onNavigate} onCopySignal={onCopySignal} />
      <Competencies />

      <section className="section-shell">
        <div className="page-shell flex flex-col gap-10">
          <SectionHeading
            eyebrow="Engagement Tracks"
            title="Programs sized for quick wins, platform uplift, and continuous validation."
            description="Every engagement is built to preserve engineering throughput while making risk more visible and remediation more repeatable."
            action={
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => onNavigate('contact')}
                className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary px-5 py-3 text-sm font-bold text-background-dark shadow-[0_0_24px_rgba(0,194,204,0.25)]"
              >
                Start Secure Intake
                <ArrowRight className="size-4" />
              </motion.button>
            }
          />

          <div className="grid gap-6 xl:grid-cols-3">
            {serviceTracks.map((track, index) => (
              <motion.article
                key={track.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="panel-shell rounded-[28px] p-6 sm:p-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.3em] ${toneClasses[track.tone]}`}>
                      {track.turnaround}
                    </span>
                    <ShieldCheck className="size-5 text-primary/70" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold tracking-tight text-white">{track.title}</h3>
                    <p className="text-base leading-7 text-slate-400">{track.summary}</p>
                  </div>

                  <div className="grid gap-3">
                    {track.deliverables.map((deliverable) => (
                      <div
                        key={deliverable}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300"
                      >
                        <CheckCircle2 className="size-4 shrink-0 text-primary" />
                        <span>{deliverable}</span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ x: 4 }}
                    type="button"
                    onClick={() => onNavigate(track.route)}
                    className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Open track
                    <ArrowRight className="size-4" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
