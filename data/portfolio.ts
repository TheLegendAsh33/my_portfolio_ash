export type RouteKey = 'home' | 'infrastructure' | 'reports' | 'contact';
export type ToneKey = 'cyan' | 'violet' | 'emerald' | 'amber';
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type ReportStatus = 'resolved' | 'monitoring' | 'mitigated' | 'in-progress';

export interface NavigationItem {
  key: RouteKey;
  label: string;
  description: string;
}

export interface MetricItem {
  label: string;
  value: string;
  detail: string;
}

export interface CommandAction {
  id: string;
  label: string;
  command: string;
  description: string;
  output: string[];
  route?: RouteKey;
  accent: ToneKey;
}

export interface CompetencyItem {
  title: string;
  description: string;
  percentage: number;
  stat: string;
  tone: ToneKey;
}

export interface ServiceTrack {
  title: string;
  summary: string;
  deliverables: string[];
  turnaround: string;
  route: RouteKey;
  tone: ToneKey;
}

export interface InfrastructureView {
  id: string;
  label: string;
  strapline: string;
  summary: string;
  metrics: MetricItem[];
  controls: string[];
  pipeline: string[];
}

export interface VulnerabilityReport {
  id: string;
  title: string;
  severity: Severity;
  riskScore: number;
  status: ReportStatus;
  environment: string;
  discoveredOn: string;
  owner: string;
  summary: string;
  remediation: string;
  tags: string[];
}

export interface ContactChannel {
  label: string;
  value: string;
  detail: string;
  actionLabel?: string;
}

export const navigationItems: NavigationItem[] = [
  {
    key: 'home',
    label: '/home',
    description: 'Command overview, competencies, and service tracks.',
  },
  {
    key: 'infrastructure',
    label: '/infrastructure',
    description: 'Landing zones, runtime controls, and observability posture.',
  },
  {
    key: 'reports',
    label: '/vuln_reports',
    description: 'Interactive vulnerability reporting and remediation snapshots.',
  },
  {
    key: 'contact',
    label: '/contact',
    description: 'Secure intake, engagement preferences, and response channels.',
  },
];

export const heroMetrics: MetricItem[] = [
  {
    label: 'Pipelines Hardened',
    value: '38+',
    detail: 'Shift-left controls wired into delivery flows across regulated platforms.',
  },
  {
    label: 'Critical Findings Closed',
    value: '214',
    detail: 'Actioned through automated triage, ownership mapping, and policy guardrails.',
  },
  {
    label: 'Mean Time To Remediate',
    value: '2.8h',
    detail: 'Measured over the trailing 90-day operating window for high-priority issues.',
  },
  {
    label: 'Policy Packs Enforced',
    value: '32',
    detail: 'OPA, IaC, container, and identity checks running continuously.',
  },
];

export const terminalProfile =
  'A highly automated security professional focused on shifting security left. I design secure-by-default delivery systems, instrument runtime visibility into cloud-native stacks, and turn governance requirements into fast developer workflows.';

export const commandActions: CommandAction[] = [
  {
    id: 'overview',
    label: 'Overview',
    command: './whoami --summary',
    description: 'Summarize operating model and delivery focus.',
    output: [
      'role: DevSecOps architect and cloud security engineer',
      'focus: secure software delivery, platform hardening, incident readiness',
      'mode: automation-first, developer-friendly, evidence-backed',
    ],
    accent: 'cyan',
  },
  {
    id: 'infra',
    label: 'Infra Status',
    command: './infra --status',
    description: 'Preview infrastructure posture and control coverage.',
    output: [
      'clusters_online: 12/12',
      'guardrails_enforced: network, secrets, iam, supply-chain',
      'drift_alerts: 0 critical, 1 medium pending maintenance window',
    ],
    route: 'infrastructure',
    accent: 'violet',
  },
  {
    id: 'reports',
    label: 'Latest Reports',
    command: './reports --latest',
    description: 'Open filtered vulnerability insights and recent remediations.',
    output: [
      'active_findings: 7',
      'critical: 1 | high: 2 | medium: 3 | low: 1',
      'latest_fix: signed image admission policy deployed to production',
    ],
    route: 'reports',
    accent: 'emerald',
  },
  {
    id: 'signal',
    label: 'Secure Channel',
    command: './contact --signal',
    description: 'Retrieve preferred engagement and contact workflow.',
    output: [
      'primary_channel: secure@vulnscanner.dev',
      'response_sla: under 24 hours for audit and hardening requests',
      'engagement_types: audits, platform uplift, secure delivery enablement',
    ],
    route: 'contact',
    accent: 'amber',
  },
];

export const competencyItems: CompetencyItem[] = [
  {
    title: 'CI/CD Pipelines',
    description:
      'Hardened GitHub Actions, Jenkins, and GitLab CI with SAST, SCA, SBOM, and provenance gates.',
    percentage: 95,
    stat: '+12% deployment velocity after guardrail rollout',
    tone: 'cyan',
  },
  {
    title: 'Kubernetes Security',
    description:
      'Secure cluster operations with runtime detection, admission control, policy as code, and workload isolation.',
    percentage: 92,
    stat: '-41% toil through reusable policy templates',
    tone: 'violet',
  },
  {
    title: 'Cloud Hardening',
    description:
      'Identity boundaries, secrets workflows, landing zones, and threat-informed controls across AWS and Azure.',
    percentage: 97,
    stat: '99.99% service availability with enforced guardrails',
    tone: 'cyan',
  },
];

export const serviceTracks: ServiceTrack[] = [
  {
    title: 'Security Baseline Sprint',
    summary:
      'Create an opinionated starting point for repositories, secrets, IaC, and dependency hygiene.',
    deliverables: ['Repo controls', 'Secret scanning', 'Branch policies'],
    turnaround: '2 weeks',
    route: 'contact',
    tone: 'cyan',
  },
  {
    title: 'Platform Hardening Program',
    summary:
      'Lift an existing Kubernetes or cloud platform into a secure-by-default operating baseline.',
    deliverables: ['Identity review', 'Admission controls', 'Runtime coverage'],
    turnaround: '4 to 6 weeks',
    route: 'infrastructure',
    tone: 'violet',
  },
  {
    title: 'Continuous Validation',
    summary:
      'Build a reporting and remediation loop that gives engineering teams a live risk picture.',
    deliverables: ['Executive metrics', 'Ownership routing', 'SLA dashboards'],
    turnaround: 'Ongoing',
    route: 'reports',
    tone: 'emerald',
  },
];

export const infrastructureViews: InfrastructureView[] = [
  {
    id: 'landing-zones',
    label: 'Landing Zones',
    strapline: 'Multi-account bootstrap for secure-by-default cloud foundations.',
    summary:
      'Account vending, network segmentation, identity boundaries, and Terraform policy packs aligned around least privilege from day one.',
    metrics: [
      { label: 'Accounts Governed', value: '24', detail: 'Provisioned with opinionated bootstrap controls and logging defaults.' },
      { label: 'Terraform Modules', value: '63', detail: 'Reusable modules with policy checks running pre-merge and pre-apply.' },
      { label: 'Guardrails', value: '18', detail: 'SCP, IAM, network, and encryption baselines active across environments.' },
    ],
    controls: [
      'Identity partitioning with scoped roles, break-glass access, and short-lived credentials.',
      'Immutable networking defaults with private services, inspection points, and egress policy.',
      'Continuous evidence capture into log archive, asset inventory, and compliance snapshots.',
    ],
    pipeline: [
      'Pre-commit IaC linting, secret scans, and module conformance checks.',
      'Plan-time policy packs for encryption, public exposure, and trust boundaries.',
      'Post-apply drift watch with automated rollback recommendations.',
    ],
  },
  {
    id: 'runtime-mesh',
    label: 'Runtime Mesh',
    strapline: 'Kubernetes runtime guardrails tuned for high-throughput teams.',
    summary:
      'Admission controllers, workload identities, runtime policies, and service mesh segmentation keep production clusters resilient without slowing teams down.',
    metrics: [
      { label: 'Clusters Online', value: '12', detail: 'Regional clusters with canary promotion and guarded release lanes.' },
      { label: 'Runtime Policies', value: '47', detail: 'Falco, Kyverno, Pod Security, and image verification policies active.' },
      { label: 'Namespaces Guarded', value: '86', detail: 'Mapped to service tiers, ownership, and blast-radius constraints.' },
    ],
    controls: [
      'Signed image enforcement with provenance checks and digest pinning.',
      'Namespace and workload segmentation using service mesh authorization and identity-aware policies.',
      'Continuous runtime telemetry correlated with CI metadata for faster triage.',
    ],
    pipeline: [
      'Image build attestations and SBOM generation at source.',
      'Admission-time policy checks for workload, network, and secret posture.',
      'Runtime anomaly alerts routed to ownership-aware remediation workflows.',
    ],
  },
  {
    id: 'observability',
    label: 'Observability',
    strapline: 'Evidence-rich telemetry for engineering, security, and compliance stakeholders.',
    summary:
      'Metrics, traces, logs, and vulnerability signals are aggregated into operational dashboards that make risk visible and actionable.',
    metrics: [
      { label: 'Signals Correlated', value: '9', detail: 'Findings, logs, traces, deploys, and ownership context stitched together.' },
      { label: 'Dashboards', value: '21', detail: 'Operational, executive, and remediation-specific dashboard views maintained.' },
      { label: 'Mean Alert Noise Cut', value: '63%', detail: 'Reduction achieved by ownership routing and severity-aware enrichment.' },
    ],
    controls: [
      'Telemetry pipelines enriched with deployment, service ownership, and environment metadata.',
      'Remediation dashboards aligned to SLA commitments and change windows.',
      'Evidence snapshots generated for auditors without manual spreadsheet churn.',
    ],
    pipeline: [
      'Signal normalization from scanners, cloud trails, and runtime sensors.',
      'Scoring and suppression logic tuned for real engineering response paths.',
      'Executive rollups generated from the same source of truth as tactical queues.',
    ],
  },
];

export const vulnerabilityReports: VulnerabilityReport[] = [
  {
    id: 'VR-241',
    title: 'Unsigned base image deployed to staging workload set',
    severity: 'critical',
    riskScore: 94,
    status: 'mitigated',
    environment: 'EKS / Staging',
    discoveredOn: '2026-03-29',
    owner: 'Platform Security',
    summary:
      'A fallback image tag bypassed the signed-image policy after an exception path was left enabled during maintenance.',
    remediation:
      'Closed the exception path, pinned signed digests in the release template, and added an alert on unsigned pull attempts.',
    tags: ['containers', 'supply-chain', 'policy'],
  },
  {
    id: 'VR-235',
    title: 'Overly broad CI token scope in mono-repo workflow',
    severity: 'high',
    riskScore: 82,
    status: 'resolved',
    environment: 'GitHub Actions',
    discoveredOn: '2026-03-24',
    owner: 'Developer Experience',
    summary:
      'A shared automation token retained repository write access for jobs that only required package publish permissions.',
    remediation:
      'Split workflow identities, tightened default permissions, and added policy checks to block wide scopes at review time.',
    tags: ['ci-cd', 'identity', 'least-privilege'],
  },
  {
    id: 'VR-228',
    title: 'Public object storage bucket exposed historical scan artifacts',
    severity: 'high',
    riskScore: 77,
    status: 'monitoring',
    environment: 'AWS / Shared Services',
    discoveredOn: '2026-03-21',
    owner: 'Cloud Platform',
    summary:
      'Historical dependency scan reports remained public after a legacy sharing setting drifted from the hardened baseline.',
    remediation:
      'Applied block-public-access, moved artifacts to a private archive, and added drift detection with auto-remediation hooks.',
    tags: ['storage', 'drift', 'cloud'],
  },
  {
    id: 'VR-223',
    title: 'Missing network policy on internal observability namespace',
    severity: 'medium',
    riskScore: 61,
    status: 'in-progress',
    environment: 'Kubernetes / Production',
    discoveredOn: '2026-03-18',
    owner: 'Reliability Engineering',
    summary:
      'A new namespace entered production without the baseline east-west network restriction package applied.',
    remediation:
      'Namespace ownership was mapped, baseline policies queued for rollout, and namespace creation now checks for required policy bundles.',
    tags: ['network', 'kubernetes', 'runtime'],
  },
  {
    id: 'VR-219',
    title: 'Deprecated OpenSSL package detected in ephemeral build runner',
    severity: 'medium',
    riskScore: 56,
    status: 'resolved',
    environment: 'Build Fleet',
    discoveredOn: '2026-03-14',
    owner: 'Build Engineering',
    summary:
      'One runner image lagged behind the hardened template and exposed a deprecated OpenSSL package in a non-production lane.',
    remediation:
      'Rebuilt the runner image from the gold template and added image freshness checks before autoscaling registration.',
    tags: ['runners', 'images', 'patching'],
  },
  {
    id: 'VR-211',
    title: 'Orphaned secret reference in preview environment',
    severity: 'low',
    riskScore: 33,
    status: 'resolved',
    environment: 'Preview Apps',
    discoveredOn: '2026-03-08',
    owner: 'Application Platform',
    summary:
      'A preview app referenced an unused secret path after the service rotated to workload identity access.',
    remediation:
      'Removed the secret mount, expired the stale path, and updated the preview template to reject manual secret injections.',
    tags: ['secrets', 'preview', 'cleanup'],
  },
];

export const contactChannels: ContactChannel[] = [
  {
    label: 'Secure Mail',
    value: 'secure@vulnscanner.dev',
    detail: 'Best for audits, hardening requests, and longer project briefs.',
    actionLabel: 'Copy address',
  },
  {
    label: 'PGP Fingerprint',
    value: '92A1 6E0F 5D55 13B3 7C2A  9F10 8A76 55D0 44C9 1F71',
    detail: 'Available for encrypted intake and sensitive environment details.',
    actionLabel: 'Copy fingerprint',
  },
  {
    label: 'Response SLA',
    value: '< 24 hours',
    detail: 'Typical first response window for consulting, advisory, and platform uplift work.',
  },
];

export const contactQuestions = [
  'What outcome do you need: audit readiness, platform hardening, or delivery modernization?',
  'Which environment matters most right now: CI/CD, Kubernetes, cloud foundation, or reporting?',
  'Do you need a one-time sprint, embedded support, or a longer transformation program?',
];

export const briefingPacket = {
  profile: {
    name: 'VULN_SCANNER',
    role: 'DevSecOps Architect',
    focus: ['Cloud hardening', 'Pipeline security', 'Runtime visibility', 'Risk reporting'],
  },
  navigation: navigationItems,
  heroMetrics,
  services: serviceTracks,
  latestReports: vulnerabilityReports.map((report) => ({
    id: report.id,
    title: report.title,
    severity: report.severity,
    status: report.status,
    environment: report.environment,
  })),
  contact: contactChannels,
};
