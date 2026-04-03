import type { RouteKey, Severity, VulnerabilityReport } from '../data/portfolio';

const routeSet = new Set<RouteKey>(['home', 'infrastructure', 'reports', 'contact']);

export const toRouteHash = (route: RouteKey) => `#/${route}`;

export const normalizeRoute = (value?: string | null): RouteKey => {
  const cleaned = value?.replace(/^#\/?/, '').trim().toLowerCase();
  return cleaned && routeSet.has(cleaned as RouteKey) ? (cleaned as RouteKey) : 'home';
};

export const downloadDataFile = (filename: string, data: string, mimeType: string) => {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

export const copyText = async (value: string) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  return false;
};

export const validateEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const buildMailtoLink = (email: string, subject: string, body: string) =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const severityOrder: Record<Severity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

export const compareBySeverity = (left: Severity, right: Severity) =>
  severityOrder[right] - severityOrder[left];

export const summarizeReports = (reports: VulnerabilityReport[]) =>
  reports.reduce(
    (accumulator, report) => {
      accumulator.total += 1;
      accumulator.open += report.status === 'resolved' ? 0 : 1;
      accumulator.highRisk += report.riskScore >= 75 ? 1 : 0;
      accumulator[report.severity] += 1;
      return accumulator;
    },
    {
      total: 0,
      open: 0,
      highRisk: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    }
  );
