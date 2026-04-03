import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Copy, Mail, Send, ShieldCheck } from 'lucide-react';
import { contactChannels, contactQuestions, type RouteKey } from '../data/portfolio';
import { buildMailtoLink, validateEmail } from '../utils/siteActions';
import { SectionHeading } from './SectionHeading';

interface ContactPageProps {
  onNavigate: (route: RouteKey) => void;
  onCopyValue: (value: string, label: string) => void;
}

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  objective: string;
  engagement: string;
  message: string;
}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  company: '',
  objective: 'Platform Hardening',
  engagement: 'Security Baseline Sprint',
  message: '',
};

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onCopyValue }) => {
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({});
  const [draftSummary, setDraftSummary] = useState('');
  const [draftLink, setDraftLink] = useState('');

  const updateField = (field: keyof ContactFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof ContactFormState, string>> = {};

    if (!formState.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!validateEmail(formState.email)) {
      nextErrors.email = 'A valid email is required.';
    }

    if (!formState.message.trim()) {
      nextErrors.message = 'Add a short brief so the intake is actionable.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const summary = [
      'Secure Intake Request',
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Company: ${formState.company || 'Independent / undisclosed'}`,
      `Objective: ${formState.objective}`,
      `Engagement: ${formState.engagement}`,
      '',
      'Brief:',
      formState.message,
    ].join('\n');

    setDraftSummary(summary);
    setDraftLink(buildMailtoLink('secure@vulnscanner.dev', `[Portfolio Intake] ${formState.objective}`, summary));
  };

  return (
    <section className="section-shell">
      <div className="page-shell flex flex-col gap-10">
        <SectionHeading
          eyebrow="Secure Intake"
          title="Open a conversation without losing the same structured, security-first feel as the rest of the site."
          description="Use the form to prepare a clean project brief, copy any secure channel detail you need, and launch an email draft when you are ready."
          action={
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => onNavigate('reports')}
              className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/[0.08]"
            >
              Review Latest Reports
              <ArrowRight className="size-4 text-primary" />
            </motion.button>
          }
        />

        <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col gap-6">
            <div className="panel-shell rounded-[32px] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-5 text-primary" />
                <h3 className="text-2xl font-bold tracking-tight text-white">Channels</h3>
              </div>
              <div className="mt-6 grid gap-4">
                {contactChannels.map((channel) => (
                  <motion.div
                    key={channel.label}
                    whileHover={{ y: -3 }}
                    className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5"
                  >
                    <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">{channel.label}</p>
                    <p className="mt-3 text-lg font-semibold text-white">{channel.value}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{channel.detail}</p>
                    {channel.actionLabel ? (
                      <button
                        type="button"
                        onClick={() => onCopyValue(channel.value, channel.label)}
                        className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                      >
                        <Copy className="size-4" />
                        {channel.actionLabel}
                      </button>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="panel-shell rounded-[32px] p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <Mail className="size-5 text-primary" />
                <h3 className="text-2xl font-bold tracking-tight text-white">Useful Prompts</h3>
              </div>
              <div className="mt-6 grid gap-4">
                {contactQuestions.map((question) => (
                  <div key={question} className="rounded-2xl border border-white/10 bg-background-dark/60 p-4 text-sm leading-6 text-slate-300">
                    {question}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="panel-shell rounded-[32px] p-6 sm:p-8">
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500">Engagement Form</p>
                <h3 className="mt-3 text-3xl font-black tracking-tight text-white">Build an intake draft in one pass.</h3>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-400">
                  This keeps the workflow lightweight while still collecting enough detail to turn the first reply into something useful.
                </p>
              </div>

              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-200">Name</span>
                    <input
                      value={formState.name}
                      onChange={(event) => updateField('name', event.target.value)}
                      className="focus-ring rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                      placeholder="Jane Doe"
                    />
                    {errors.name ? <span className="text-sm text-rose-400">{errors.name}</span> : null}
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-200">Email</span>
                    <input
                      value={formState.email}
                      onChange={(event) => updateField('email', event.target.value)}
                      className="focus-ring rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                      placeholder="jane@company.com"
                    />
                    {errors.email ? <span className="text-sm text-rose-400">{errors.email}</span> : null}
                  </label>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-200">Company</span>
                    <input
                      value={formState.company}
                      onChange={(event) => updateField('company', event.target.value)}
                      className="focus-ring rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                      placeholder="Acme Cloud"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-semibold text-slate-200">Objective</span>
                    <select
                      value={formState.objective}
                      onChange={(event) => updateField('objective', event.target.value)}
                      className="focus-ring rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3 text-white outline-none"
                    >
                      <option>Platform Hardening</option>
                      <option>Cloud Security Audit</option>
                      <option>CI/CD Modernization</option>
                      <option>Continuous Validation</option>
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-200">Engagement Type</span>
                  <select
                    value={formState.engagement}
                    onChange={(event) => updateField('engagement', event.target.value)}
                    className="focus-ring rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3 text-white outline-none"
                  >
                    <option>Security Baseline Sprint</option>
                    <option>Platform Hardening Program</option>
                    <option>Continuous Validation</option>
                    <option>Advisory / Fractional Support</option>
                  </select>
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-slate-200">Brief</span>
                  <textarea
                    value={formState.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    rows={7}
                    className="focus-ring rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3 text-white outline-none placeholder:text-slate-500"
                    placeholder="What environment needs attention, what constraints matter, and what outcome would make the project successful?"
                  />
                  {errors.message ? <span className="text-sm text-rose-400">{errors.message}</span> : null}
                </label>

                <div className="flex flex-wrap gap-3 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary px-5 py-3 text-sm font-bold text-background-dark shadow-[0_0_24px_rgba(0,194,204,0.25)]"
                  >
                    Generate Secure Draft
                    <Send className="size-4" />
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormState(initialFormState);
                      setErrors({});
                      setDraftSummary('');
                      setDraftLink('');
                    }}
                    className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/[0.08]"
                  >
                    Reset Form
                  </button>
                </div>
              </form>

              {draftSummary ? (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[28px] border border-primary/20 bg-primary/10 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-primary/80">Draft Ready</p>
                      <h4 className="mt-2 text-xl font-bold text-white">Your intake summary is prepared.</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={draftLink}
                        className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary px-4 py-2 text-sm font-bold text-background-dark"
                      >
                        Open Email Draft
                      </a>
                      <button
                        type="button"
                        onClick={() => onCopyValue(draftSummary, 'Draft summary')}
                        className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-background-dark/50 px-4 py-2 text-sm font-semibold text-white"
                      >
                        <Copy className="size-4 text-primary" />
                        Copy Summary
                      </button>
                    </div>
                  </div>

                  <pre className="mt-5 overflow-x-auto rounded-2xl border border-white/10 bg-background-dark/70 p-4 text-sm leading-6 text-slate-300 whitespace-pre-wrap">
                    {draftSummary}
                  </pre>
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
