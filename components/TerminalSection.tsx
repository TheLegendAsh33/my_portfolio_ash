import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Copy, Terminal } from 'lucide-react';
import { commandActions, terminalProfile, type RouteKey } from '../data/portfolio';
import { useTypewriter } from '../hooks/useTypewriter';

interface TerminalSectionProps {
  onNavigate: (route: RouteKey) => void;
  onCopySignal: () => void;
}

export const TerminalSection: React.FC<TerminalSectionProps> = ({ onNavigate, onCopySignal }) => {
  const [isTyping, setIsTyping] = useState(false);
  const [activeCommandId, setActiveCommandId] = useState(commandActions[0].id);
  const typedText = useTypewriter(terminalProfile, isTyping, 14);
  const activeCommand = commandActions.find((command) => command.id === activeCommandId) ?? commandActions[0];

  useEffect(() => {
    const trigger = document.getElementById('terminal-trigger');

    if (!trigger) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsTyping(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-shell" id="terminal-trigger">
      <div className="page-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="panel-shell terminal-noise rounded-[32px]"
        >
          <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-[#111a2f] to-[#0a1021] px-4 py-4 sm:px-6">
            <div className="flex gap-2">
              <div className="size-3 rounded-full bg-rose-500/80" />
              <div className="size-3 rounded-full bg-amber-500/80" />
              <div className="size-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="hidden text-[10px] font-mono uppercase tracking-[0.35em] text-slate-500 sm:inline">
              bash - 120x40 - profile.sh
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">
              <Terminal className="size-3.5" />
              active
            </div>
          </div>

          <div className="grid gap-8 p-5 sm:p-6 lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-start gap-3">
                  <span className="font-mono font-bold text-primary">~/devsecops $</span>
                  <p className="text-lg text-white">whoami</p>
                </div>
                <div className="min-h-[148px] rounded-[24px] border border-white/10 bg-background-dark/60 p-5 text-base leading-8 text-slate-300">
                  "{typedText}
                  {isTyping && typedText.length < terminalProfile.length ? (
                    <span className="ml-1 inline-block h-5 w-2 animate-pulse bg-primary align-middle" />
                  ) : null}
                  "
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">Quick Commands</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {commandActions.map((command) => {
                    const isActive = command.id === activeCommand.id;

                    return (
                      <button
                        key={command.id}
                        type="button"
                        onClick={() => setActiveCommandId(command.id)}
                        className={`focus-ring rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] transition-all ${
                          isActive
                            ? 'border-primary/40 bg-primary/10 text-primary'
                            : 'border-white/10 bg-white/[0.04] text-slate-400 hover:border-white/20 hover:text-white'
                        }`}
                      >
                        {command.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-background-dark/70 p-5">
              <div className="border-b border-white/10 pb-4">
                <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">Command Output</p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white">{activeCommand.command}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{activeCommand.description}</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCommand.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="mt-5 grid gap-3"
                >
                  {activeCommand.output.map((line) => (
                    <div key={line} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                      <span className="mr-2 font-mono text-primary">&gt;</span>
                      {line}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {activeCommand.route ? (
                  <button
                    type="button"
                    onClick={() => onNavigate(activeCommand.route as RouteKey)}
                    className="focus-ring inline-flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-4 text-left transition-all hover:bg-primary/15"
                  >
                    <div>
                      <p className="font-semibold text-white">Open linked page</p>
                      <p className="mt-1 text-sm text-slate-300">Jump directly into the related portfolio route.</p>
                    </div>
                    <ArrowRight className="size-4 text-primary" />
                  </button>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4">
                    <p className="font-semibold text-white">Core operating summary</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Use the command chips to pivot into infrastructure, reports, or contact.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={onCopySignal}
                  className="focus-ring inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left transition-all hover:border-white/20"
                >
                  <div>
                    <p className="font-semibold text-white">Copy secure fingerprint</p>
                    <p className="mt-1 text-sm text-slate-400">Grab the preferred encrypted intake key for sensitive outreach.</p>
                  </div>
                  <Copy className="size-4 text-primary" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
