import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  align?: 'start' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  action,
  align = 'start',
}) => {
  const isCentered = align === 'center';

  return (
    <div
      className={`flex flex-col gap-6 ${
        isCentered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`flex max-w-3xl flex-col gap-4 ${isCentered ? 'items-center' : ''}`}
      >
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.35em] text-primary/90">
          <span className="size-2 rounded-full bg-primary shadow-[0_0_12px_rgba(0,194,204,0.7)]" />
          {eyebrow}
        </span>
        <div className={`flex flex-col gap-3 ${isCentered ? 'items-center' : ''}`}>
          <h2 className="fluid-display text-balance font-black tracking-tight text-white">{title}</h2>
          <p className="max-w-2xl text-pretty text-base leading-7 text-slate-400 md:text-lg">
            {description}
          </p>
        </div>
      </motion.div>

      {action ? <div className={`flex ${isCentered ? 'justify-center' : 'lg:justify-end'}`}>{action}</div> : null}
    </div>
  );
};
