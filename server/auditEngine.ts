/**
 * TrueNorth Audit Engine
 * Scores audit responses and generates personalised recommendations.
 */

export type AuditAnswers = Record<string, string>;

export interface AuditScore {
  total: number;       // 0–10
  label: string;       // e.g. "Early Stage"
  colour: string;      // hex for email rendering
  description: string;
}

export interface AuditFinding {
  area: string;
  status: string;
  insight: string;
  urgency: "high" | "medium" | "low";
}

export interface AuditRecommendation {
  title: string;
  description: string;
  service: string;
  serviceUrl: string;
}

export interface AuditReport {
  score: AuditScore;
  findings: AuditFinding[];
  recommendations: AuditRecommendation[];
  summary: string;
  nextStep: string;
}

// ─── Scoring ────────────────────────────────────────────────────────────────

const SCORE_MAP: Record<string, Record<string, number>> = {
  manual_tasks: {
    "Less than 2hrs": 2,
    "2-5hrs": 1.5,
    "5-10hrs": 1,
    "10hrs+": 0,
  },
  tools_connected: {
    "Fully connected": 2,
    "Partially connected": 1.5,
    "Mostly manual": 0.5,
    "No system in place": 0,
  },
  reporting: {
    "Automated in real-time": 2,
    "Semi-automated": 1.5,
    "Manual spreadsheets": 0.5,
    "We do not report regularly": 0,
  },
  bottleneck: {
    "Hiring / capacity": 1,
    "Inconsistent processes": 0.5,
    "Poor data visibility": 0.5,
    "Too many tools / no integration": 0,
  },
  ai_usage: {
    "Strategically across operations": 2,
    "Ad hoc / experimenting": 1.5,
    "Barely / not at all": 0.5,
    "Actively looking to start": 1,
  },
};

function computeRawScore(answers: AuditAnswers): number {
  let total = 0;
  for (const [key, value] of Object.entries(answers)) {
    total += SCORE_MAP[key]?.[value] ?? 0;
  }
  // Max possible = 2+2+2+1+2 = 9 → normalise to 10
  return Math.round((total / 9) * 10);
}

function scoreLabel(score: number): AuditScore {
  if (score <= 2) return { total: score, label: "Manual & Fragmented", colour: "#ef4444", description: "Your operations are largely manual. There is significant untapped potential for automation and AI to reduce friction and free up capacity." };
  if (score <= 4) return { total: score, label: "Early Stage", colour: "#f97316", description: "You have some systems in place but they are not yet connected or optimised. The foundations are there — now it is time to build on them." };
  if (score <= 6) return { total: score, label: "Developing", colour: "#eab308", description: "You are making progress. Some automation is in place, but there are clear gaps in integration and visibility that are costing you time and money." };
  if (score <= 8) return { total: score, label: "Optimised", colour: "#22c55e", description: "Your operations are well-structured. The next step is to layer in AI and advanced automation to unlock the next level of leverage." };
  return { total: score, label: "Operationally Advanced", colour: "#00FFFF", description: "You are operating at a high level. Focus on continuous improvement, AI-driven intelligence, and scaling what is already working." };
}

// ─── Findings ───────────────────────────────────────────────────────────────

function buildFindings(answers: AuditAnswers): AuditFinding[] {
  const findings: AuditFinding[] = [];

  // Manual tasks
  const mt = answers.manual_tasks;
  if (mt === "10hrs+") findings.push({ area: "Manual Workload", status: mt, insight: "Your team is spending over 10 hours per week on repetitive tasks. This is a direct drag on capacity and a clear target for automation.", urgency: "high" });
  else if (mt === "5-10hrs") findings.push({ area: "Manual Workload", status: mt, insight: "5–10 hours of manual work per week represents a significant operational cost. Automating even 50% of this would free up meaningful capacity.", urgency: "medium" });
  else if (mt === "2-5hrs") findings.push({ area: "Manual Workload", status: mt, insight: "2–5 hours of manual tasks per week is manageable but worth addressing. Targeted automations could eliminate this entirely.", urgency: "low" });
  else findings.push({ area: "Manual Workload", status: mt, insight: "Your manual workload is low — a strong indicator of good process discipline. Focus on maintaining this as you scale.", urgency: "low" });

  // Tools connected
  const tc = answers.tools_connected;
  if (tc === "No system in place") findings.push({ area: "Tool Integration", status: tc, insight: "Your business tools are not connected. Data is siloed, handoffs are manual, and errors are inevitable. This is your highest-priority fix.", urgency: "high" });
  else if (tc === "Mostly manual") findings.push({ area: "Tool Integration", status: tc, insight: "Most of your tool connections are manual. You are likely losing hours each week to copy-paste workflows and missed handoffs.", urgency: "high" });
  else if (tc === "Partially connected") findings.push({ area: "Tool Integration", status: tc, insight: "Some tools are connected, but gaps remain. Closing these will reduce errors and unlock real-time data flow across your business.", urgency: "medium" });
  else findings.push({ area: "Tool Integration", status: tc, insight: "Your tools are fully connected — excellent. The next step is to layer automation on top of these integrations.", urgency: "low" });

  // Reporting
  const rp = answers.reporting;
  if (rp === "We do not report regularly") findings.push({ area: "Reporting & Visibility", status: rp, insight: "Without regular reporting, you are making decisions without data. This is a critical gap that exposes you to avoidable risk.", urgency: "high" });
  else if (rp === "Manual spreadsheets") findings.push({ area: "Reporting & Visibility", status: rp, insight: "Manual spreadsheet reporting is slow, error-prone, and does not scale. Automating your dashboards would give you real-time visibility with zero effort.", urgency: "high" });
  else if (rp === "Semi-automated") findings.push({ area: "Reporting & Visibility", status: rp, insight: "You have some automation in your reporting, but there is still manual effort involved. Closing this gap would give you always-on visibility.", urgency: "medium" });
  else findings.push({ area: "Reporting & Visibility", status: rp, insight: "Real-time automated reporting is a significant competitive advantage. Ensure your dashboards are tied to the right KPIs.", urgency: "low" });

  // Bottleneck
  const bn = answers.bottleneck;
  if (bn === "Too many tools / no integration") findings.push({ area: "Primary Bottleneck", status: bn, insight: "Tool sprawl is one of the most common operational drains. Consolidating and connecting your stack will have an immediate impact on speed and clarity.", urgency: "high" });
  else if (bn === "Poor data visibility") findings.push({ area: "Primary Bottleneck", status: bn, insight: "Poor visibility means slow decisions and missed opportunities. A unified dashboard built on your existing data would solve this quickly.", urgency: "high" });
  else if (bn === "Inconsistent processes") findings.push({ area: "Primary Bottleneck", status: bn, insight: "Inconsistent processes are a scaling risk. Documenting and automating your core workflows will create predictability and reduce rework.", urgency: "medium" });
  else findings.push({ area: "Primary Bottleneck", status: bn, insight: "Hiring and capacity constraints are often a symptom of under-automation. Freeing up time through systems reduces the pressure to hire.", urgency: "medium" });

  // AI usage
  const ai = answers.ai_usage;
  if (ai === "Barely / not at all") findings.push({ area: "AI Adoption", status: ai, insight: "You are not yet using AI in your operations. This is a significant opportunity — even basic AI tools can save hours per week across your team.", urgency: "high" });
  else if (ai === "Actively looking to start") findings.push({ area: "AI Adoption", status: ai, insight: "You are ready to start with AI. The key is to begin with a specific, high-value use case rather than trying to automate everything at once.", urgency: "medium" });
  else if (ai === "Ad hoc / experimenting") findings.push({ area: "AI Adoption", status: ai, insight: "Ad hoc AI use is a good start, but without a strategy it rarely delivers consistent value. A structured approach will multiply your results.", urgency: "medium" });
  else findings.push({ area: "AI Adoption", status: ai, insight: "Strategic AI adoption is a strong competitive advantage. Focus on expanding use cases and measuring outcomes rigorously.", urgency: "low" });

  return findings;
}

// ─── Recommendations ─────────────────────────────────────────────────────────

function buildRecommendations(answers: AuditAnswers, score: number): AuditRecommendation[] {
  const recs: AuditRecommendation[] = [];
  const base = "https://truenorthoperationsgroup.com/#services";

  if (answers.manual_tasks === "10hrs+" || answers.manual_tasks === "5-10hrs") {
    recs.push({ title: "Ops Starter — First Automation Live in 48hrs", description: "Remove your most painful manual process with a single, targeted automation. Most clients see immediate time savings from day one.", service: "Ops Starter", serviceUrl: base });
  }

  if (answers.tools_connected === "No system in place" || answers.tools_connected === "Mostly manual") {
    recs.push({ title: "Systems Integration — Connect Your Stack", description: "Connect your CRM, email, finance, and project management tools so data flows automatically. No more manual data entry or missed handoffs.", service: "Systems Integration", serviceUrl: base });
  }

  if (answers.reporting === "Manual spreadsheets" || answers.reporting === "We do not report regularly") {
    recs.push({ title: "Operations Dashboard — Real-Time Visibility", description: "Replace manual spreadsheets with a live dashboard built on your existing tools. One source of truth for every decision.", service: "Operations Dashboard", serviceUrl: base });
  }

  if (answers.ai_usage === "Barely / not at all" || answers.ai_usage === "Actively looking to start") {
    recs.push({ title: "AI Agent Deployment — Autonomous Workflows", description: "Deploy custom AI agents that handle triage, routing, drafting, and reporting autonomously — built to your processes, trained on your data.", service: "AI Agent Deployment", serviceUrl: base });
  }

  if (score >= 7) {
    recs.push({ title: "Managed Ops Partner — Continuous Improvement", description: "You are already operating at a high level. A fractional ops partner can help you scale what is working and identify the next layer of leverage.", service: "Managed Ops Partner", serviceUrl: base });
  }

  // Always include discovery call as final recommendation
  if (recs.length < 2) {
    recs.push({ title: "ERP/CRM Build-Out — Full Operating System", description: "Design and build a complete operating system for your business — CRM, project management, finance, and reporting — with SOPs and team training included.", service: "ERP/CRM Build-Out", serviceUrl: base });
  }

  return recs.slice(0, 3); // Cap at 3 recommendations
}

// ─── Summary ─────────────────────────────────────────────────────────────────

function buildSummary(score: number, findings: AuditFinding[]): string {
  const highUrgency = findings.filter(f => f.urgency === "high").length;
  if (highUrgency >= 3) return `Your audit reveals ${highUrgency} high-priority operational gaps. Addressing these systematically will have an immediate impact on your capacity, speed, and margins.`;
  if (highUrgency >= 1) return `Your audit identifies ${highUrgency} high-priority area${highUrgency > 1 ? "s" : ""} requiring attention, alongside opportunities to optimise your existing systems for greater leverage.`;
  if (score >= 7) return "Your operations are well-structured. The focus now should be on scaling what is working and layering in advanced AI capabilities to unlock the next level of performance.";
  return "Your audit highlights several opportunities to reduce manual effort, improve visibility, and build a more scalable operational foundation.";
}

// ─── Public API ──────────────────────────────────────────────────────────────

export function generateAuditReport(answers: AuditAnswers): AuditReport {
  const rawScore = computeRawScore(answers);
  const score = scoreLabel(rawScore);
  const findings = buildFindings(answers);
  const recommendations = buildRecommendations(answers, rawScore);
  const summary = buildSummary(rawScore, findings);

  const nextStep = rawScore <= 4
    ? "Book a free discovery call to map your highest-leverage starting point."
    : rawScore <= 7
    ? "Book a paid discovery call (£150, credited against your first engagement) to define your next step."
    : "Speak to our team about a Managed Ops Partnership to scale your operational advantage.";

  return { score, findings, recommendations, summary, nextStep };
}
