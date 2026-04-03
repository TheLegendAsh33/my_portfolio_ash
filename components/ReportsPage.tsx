import React, { useDeferredValue, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Filter, Search, ShieldAlert, TriangleAlert } from 'lucide-react';
import { type RouteKey, type Severity, vulnerabilityReports } from '../data/portfolio';
import { compareBySeverity, downloadDataFile, summarizeReports } from '../utils/siteActions';
import { SectionHeading } from './SectionHeading';

interface ReportsPageProps {
  onNavigate: (route: RouteKey) => void;
}

type SortMode = 'risk' | 'recent' | 'severity';
type SeverityFilter = Severity | 'all';

const severityStyles: Record<Severity, string> = {
  critical: 'border-rose-500/25 bg-rose-500/10 text-rose-300',
  high: 'border-orange-500/25 bg-orange-500/10 text-orange-300',
  medium: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  low: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
};

const statusStyles: Record<string, string> = {
  resolved: 'bg-emerald-500/10 text-emerald-400',
  monitoring: 'bg-sky-500/10 text-sky-400',
  mitigated: 'bg-violet-500/10 text-violet-400',
  'in-progress': 'bg-amber-500/10 text-amber-400',
};

export const ReportsPage: React.FC<ReportsPageProps> = ({ onNavigate }) => {
  const [query, setQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('all');
  const [sortMode, setSortMode] = useState<SortMode>('risk');
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(vulnerabilityReports[0]?.id ?? null);

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredReports = [...vulnerabilityReports]
    .filter((report) => {
      const matchesQuery =
        deferredQuery.length === 0
          ? true
          : [report.id, report.title, report.summary, report.environment, report.owner, ...report.tags]
              .join(' ')
              .toLowerCase()
              .includes(deferredQuery);

      const matchesSeverity = severityFilter === 'all' ? true : report.severity === severityFilter;
      const matchesStatus = onlyOpen ? report.status !== 'resolved' : true;

      return matchesQuery && matchesSeverity && matchesStatus;
    })
    .sort((left, right) => {
      if (sortMode === 'recent') {
        return new Date(right.discoveredOn).getTime() - new Date(left.discoveredOn).getTime();
      }

      if (sortMode === 'severity') {
        return compareBySeverity(left.severity, right.severity);
      }

      return right.riskScore - left.riskScore;
    });

  useEffect(() => {
    if (filteredReports.length === 0) {
      setSelectedReportId(null);
      return;
    }

    if (!filteredReports.some((report) => report.id === selectedReportId)) {
      setSelectedReportId(filteredReports[0].id);
    }
  }, [filteredReports, selectedReportId]);

  const selectedReport =
    filteredReports.find((report) => report.id === selectedReportId) ??
    filteredReports[0] ??
    null;

  const reportSummary = summarizeReports(filteredReports);

  const downloadFilteredReports = () => {
    downloadDataFile(
      'vuln-scanner-report-index.json',
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          filters: { query, severityFilter, sortMode, onlyOpen },
          reports: filteredReports,
        },
        null,
        2
      ),
      'application/json'
    );
  };

  return (
    <section className="section-shell">
      <div className="page-shell flex flex-col gap-10">
        <SectionHeading
          eyebrow="Vulnerability Reports"
          title="Interactive reporting that makes risk visible, prioritized, and tied to remediation."
          description="Search the report catalog, change the sort mode, and pivot between severity bands without leaving the same UI language as the rest of the portfolio."
          action={
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={downloadFilteredReports}
              className="focus-ring inline-flex items-center gap-2 rounded-2xl border border-primary/30 bg-primary px-5 py-3 text-sm font-bold text-background-dark shadow-[0_0_24px_rgba(0,194,204,0.25)]"
            >
              Download Current View
              <Download className="size-4" />
            </motion.button>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Visible Reports', value: reportSummary.total, detail: 'Items in the current filtered view' },
            { label: 'Open Findings', value: reportSummary.open, detail: 'Statuses still requiring action or monitoring' },
            { label: 'High-Risk Items', value: reportSummary.highRisk, detail: 'Reports with risk score 75 or above' },
            { label: 'Critical', value: reportSummary.critical, detail: 'Highest severity items in the current slice' },
          ].map((item) => (
            <div key={item.label} className="panel-shell rounded-[28px] p-5">
              <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">{item.label}</p>
              <p className="mt-4 text-4xl font-black tracking-tight text-white">{item.value}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="panel-shell rounded-[32px] p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 xl:grid-cols-[1fr_auto_auto] xl:items-center">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3">
                <Search className="size-4 text-primary" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search reports, tags, owners, or environments"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />
              </label>

              <div className="flex flex-wrap gap-2">
                {(['all', 'critical', 'high', 'medium', 'low'] as SeverityFilter[]).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSeverityFilter(item)}
                    className={`focus-ring rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] transition-all ${
                      severityFilter === item
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {([
                  { key: 'risk', label: 'Risk' },
                  { key: 'recent', label: 'Recent' },
                  { key: 'severity', label: 'Severity' },
                ] as { key: SortMode; label: string }[]).map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setSortMode(option.key)}
                    className={`focus-ring rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] transition-all ${
                      sortMode === option.key
                        ? 'border-primary/40 bg-primary/10 text-primary'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
                <Filter className="size-3.5 text-primary" />
                Filters update live as you type
              </div>

              <button
                type="button"
                onClick={() => setOnlyOpen((current) => !current)}
                className={`focus-ring inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-[0.25em] transition-all ${
                  onlyOpen
                    ? 'border-primary/40 bg-primary/10 text-primary'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:text-white'
                }`}
              >
                <ShieldAlert className="size-3.5" />
                {onlyOpen ? 'Showing open only' : 'Include resolved items'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-4">
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => {
                const isSelected = report.id === selectedReport?.id;

                return (
                  <motion.button
                    key={report.id}
                    layout
                    whileHover={{ x: 4 }}
                    type="button"
                    onClick={() => setSelectedReportId(report.id)}
                    className={`focus-ring panel-shell rounded-[28px] p-5 text-left transition-all ${
                      isSelected ? 'border-primary/35 shadow-[0_0_32px_rgba(0,194,204,0.12)]' : ''
                    }`}
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] ${severityStyles[report.severity]}`}>
                              {report.severity}
                            </span>
                            <span className={`rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] ${statusStyles[report.status]}`}>
                              {report.status}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold tracking-tight text-white">{report.title}</h3>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-background-dark/70 px-4 py-3">
                          <p className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500">Risk Score</p>
                          <p className="mt-1 text-2xl font-black text-white">{report.riskScore}</p>
                        </div>
                      </div>

                      <p className="text-sm leading-6 text-slate-400">{report.summary}</p>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-500">
                        <span>{report.id}</span>
                        <span>{report.environment}</span>
                        <span>{report.discoveredOn}</span>
                        <span>{report.owner}</span>
                      </div>
                    </div>
                  </motion.button>
                );
              })
            ) : (
              <div className="panel-shell rounded-[32px] p-8 text-center">
                <TriangleAlert className="mx-auto size-10 text-primary" />
                <h3 className="mt-4 text-2xl font-bold text-white">No reports match this filter set.</h3>
                <p className="mt-3 text-base leading-7 text-slate-400">
                  Try broadening the search, clearing a severity filter, or including resolved items.
                </p>
              </div>
            )}
          </div>

          <div className="panel-shell rounded-[32px] p-6 sm:p-8">
            {selectedReport ? (
              <div className="flex h-full flex-col gap-6">
                <div className="space-y-4 border-b border-white/10 pb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] ${severityStyles[selectedReport.severity]}`}>
                      {selectedReport.severity}
                    </span>
                    <span className={`rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-[0.25em] ${statusStyles[selectedReport.status]}`}>
                      {selectedReport.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.35em] text-slate-500">{selectedReport.id}</p>
                    <h3 className="mt-3 text-3xl font-black tracking-tight text-white">{selectedReport.title}</h3>
                    <p className="mt-4 text-base leading-7 text-slate-400">{selectedReport.summary}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">Environment</p>
                    <p className="mt-3 text-lg font-semibold text-white">{selectedReport.environment}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">Owner</p>
                    <p className="mt-3 text-lg font-semibold text-white">{selectedReport.owner}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">Discovered</p>
                    <p className="mt-3 text-lg font-semibold text-white">{selectedReport.discoveredOn}</p>
                  </div>
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5">
                    <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">Risk Score</p>
                    <p className="mt-3 text-lg font-semibold text-white">{selectedReport.riskScore}</p>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-background-dark/60 p-6">
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-slate-500">Remediation Snapshot</p>
                  <p className="mt-4 text-sm leading-7 text-slate-300">{selectedReport.remediation}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedReport.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto grid gap-3">
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="focus-ring inline-flex items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 px-4 py-4 text-left transition-all hover:bg-primary/15"
                  >
                    <div>
                      <p className="font-semibold text-white">Need a remediation workflow like this?</p>
                      <p className="mt-1 text-sm text-slate-300">Open the secure intake page and outline the environment you need help with.</p>
                    </div>
                    <ArrowRight className="size-4 text-primary" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('infrastructure')}
                    className="focus-ring inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left transition-all hover:border-white/20"
                  >
                    <div>
                      <p className="font-semibold text-white">Trace back to infrastructure controls</p>
                      <p className="mt-1 text-sm text-slate-400">See the platform controls that reduce this class of issue upstream.</p>
                    </div>
                    <ArrowRight className="size-4 text-primary" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center rounded-[28px] border border-dashed border-white/10 bg-background-dark/60 p-8 text-center text-slate-400">
                Adjust the filters to surface a report and inspect its remediation path here.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
