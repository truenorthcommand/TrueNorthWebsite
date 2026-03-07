/**
 * TrueNorth Operations Efficiency Audit
 * Design: Kinetic Systems Architecture — dark command-centre, cyan/amber accents
 * Purpose: Gamified lead generation tool — diagnoses visitor's operational friction,
 *          delivers a personalised score, and captures email for follow-up.
 * Webhook: https://truenorthops.app.n8n.cloud/webhook/9f7807b5-84d0-4e94-8827-ff1536212956
 */

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ChevronRight, CheckCircle, AlertCircle, Zap, Clock, RefreshCw } from "lucide-react";
import { toast } from "sonner";

const N8N_WEBHOOK_URL =
  "https://truenorthops.app.n8n.cloud/webhook/9f7807b5-84d0-4e94-8827-ff1536212956";

// ─── Segment Router ────────────────────────────────────────────────────────────
const SEGMENTS = [
  { id: "S1", label: "Student / Individual", icon: "🎓", description: "Study, CV, personal productivity" },
  { id: "S2", label: "Freelancer / Solopreneur", icon: "⚡", description: "1-person business, client work" },
  { id: "S3", label: "Tradesman / 1-Man Band", icon: "🔧", description: "Trade, service, field-based work" },
  { id: "S4", label: "SMB / Small Team", icon: "🏢", description: "2–20 staff, growing business" },
  { id: "S5", label: "Director / Executive", icon: "📊", description: "Leadership, strategy, scale" },
  { id: "S6", label: "Enterprise / Multi-Site", icon: "🌐", description: "40+ staff, complex operations" },
];

// ─── Questions per segment ──────────────────────────────────────────────────────
const QUESTIONS: Record<string, { question: string; options: { label: string; weight: number }[] }[]> = {
  S1: [
    {
      question: "How long does it take you to produce a CV or job application from scratch?",
      options: [
        { label: "Under 30 minutes", weight: 10 },
        { label: "1–2 hours", weight: 25 },
        { label: "Half a day", weight: 40 },
        { label: "I avoid it — it takes too long", weight: 55 },
      ],
    },
    {
      question: "How much time do you spend on admin tasks (scheduling, emails, research) per week?",
      options: [
        { label: "Less than 2 hours", weight: 5 },
        { label: "2–5 hours", weight: 15 },
        { label: "5–10 hours", weight: 30 },
        { label: "More than 10 hours", weight: 45 },
      ],
    },
    {
      question: "Do you use any AI tools to help with your studies or work?",
      options: [
        { label: "Yes, daily and effectively", weight: 5 },
        { label: "Occasionally, not sure if I'm using them right", weight: 20 },
        { label: "I've tried them but given up", weight: 35 },
        { label: "No — I don't know where to start", weight: 50 },
      ],
    },
    {
      question: "How often do you miss deadlines or feel overwhelmed by workload?",
      options: [
        { label: "Rarely — I'm well organised", weight: 5 },
        { label: "Sometimes — it's manageable", weight: 20 },
        { label: "Often — it's a real problem", weight: 40 },
        { label: "Almost always — I'm constantly behind", weight: 55 },
      ],
    },
    {
      question: "If you could get back 5 hours a week, what would you do with it?",
      options: [
        { label: "More study / skill development", weight: 10 },
        { label: "More paid work or side projects", weight: 10 },
        { label: "Rest — I'm burnt out", weight: 30 },
        { label: "I can't imagine having 5 free hours", weight: 45 },
      ],
    },
    {
      question: "How confident are you in your ability to present yourself professionally online?",
      options: [
        { label: "Very confident — my profile is strong", weight: 5 },
        { label: "Fairly confident — could be better", weight: 20 },
        { label: "Not confident — I know it needs work", weight: 35 },
        { label: "I have no online presence at all", weight: 50 },
      ],
    },
  ],
  S2: [
    {
      question: "How many hours per week do you spend on admin, invoicing, and client comms?",
      options: [
        { label: "Under 3 hours", weight: 5 },
        { label: "3–6 hours", weight: 20 },
        { label: "6–10 hours", weight: 35 },
        { label: "More than 10 hours", weight: 50 },
      ],
    },
    {
      question: "How long does it take to onboard a new client from first contact to paid?",
      options: [
        { label: "Same day — it's streamlined", weight: 5 },
        { label: "1–3 days", weight: 15 },
        { label: "A week or more", weight: 30 },
        { label: "It's inconsistent and stressful", weight: 50 },
      ],
    },
    {
      question: "Do you have documented processes for your most common tasks?",
      options: [
        { label: "Yes — everything is documented", weight: 5 },
        { label: "Some things are, most aren't", weight: 20 },
        { label: "It's all in my head", weight: 40 },
        { label: "What processes? I wing it", weight: 55 },
      ],
    },
    {
      question: "How do you currently handle follow-ups with leads and clients?",
      options: [
        { label: "Automated CRM sequences", weight: 5 },
        { label: "Manual reminders — mostly works", weight: 20 },
        { label: "I try to remember — often forget", weight: 40 },
        { label: "I don't — leads fall through the cracks", weight: 55 },
      ],
    },
    {
      question: "How much revenue do you estimate you lose to inefficiency each month?",
      options: [
        { label: "Very little — I'm tight", weight: 5 },
        { label: "£200–£500", weight: 20 },
        { label: "£500–£1,500", weight: 35 },
        { label: "More than £1,500 — probably more", weight: 50 },
      ],
    },
    {
      question: "How confident are you that your business could run for a week without you?",
      options: [
        { label: "Completely — it's systemised", weight: 5 },
        { label: "Mostly — a few things need me", weight: 20 },
        { label: "Not really — it would struggle", weight: 40 },
        { label: "It would stop immediately", weight: 55 },
      ],
    },
  ],
  S3: [
    {
      question: "How long does it take you to quote a job from site visit to sending the quote?",
      options: [
        { label: "Same day — I have a system", weight: 5 },
        { label: "1–2 days", weight: 20 },
        { label: "3–5 days", weight: 35 },
        { label: "Over a week — I'm always behind on quotes", weight: 55 },
      ],
    },
    {
      question: "How do you currently manage your job schedule and appointments?",
      options: [
        { label: "Digital calendar with automated reminders", weight: 5 },
        { label: "Phone calendar — mostly works", weight: 20 },
        { label: "A notebook or whiteboard", weight: 35 },
        { label: "In my head — I miss things", weight: 55 },
      ],
    },
    {
      question: "How much time do you spend chasing invoices and payments each month?",
      options: [
        { label: "Almost none — payments come in on time", weight: 5 },
        { label: "A few hours", weight: 20 },
        { label: "Half a day or more", weight: 40 },
        { label: "It's a constant headache", weight: 55 },
      ],
    },
    {
      question: "Do you have a process for generating reviews and referrals from happy customers?",
      options: [
        { label: "Yes — it's automated", weight: 5 },
        { label: "I ask occasionally", weight: 25 },
        { label: "I rely on word of mouth", weight: 40 },
        { label: "I never ask — I should", weight: 55 },
      ],
    },
    {
      question: "How do you handle enquiries when you're on-site and can't answer the phone?",
      options: [
        { label: "Automated response and booking system", weight: 5 },
        { label: "I call back when I can", weight: 25 },
        { label: "Voicemail — I miss a lot", weight: 40 },
        { label: "I lose jobs because of this", weight: 55 },
      ],
    },
    {
      question: "How much time do you spend on paperwork, compliance, and admin each week?",
      options: [
        { label: "Under 2 hours", weight: 5 },
        { label: "2–5 hours", weight: 20 },
        { label: "5–10 hours", weight: 35 },
        { label: "More than 10 hours — it kills my evenings", weight: 55 },
      ],
    },
  ],
  S4: [
    {
      question: "How much time does your team spend on repetitive admin tasks each week?",
      options: [
        { label: "Under 5 hours total", weight: 5 },
        { label: "5–15 hours total", weight: 20 },
        { label: "15–30 hours total", weight: 40 },
        { label: "More than 30 hours — it's a real cost", weight: 55 },
      ],
    },
    {
      question: "How consistent is your client onboarding process?",
      options: [
        { label: "Fully documented and automated", weight: 5 },
        { label: "Mostly consistent — depends on who does it", weight: 20 },
        { label: "Inconsistent — every client is different", weight: 40 },
        { label: "There's no process — it's chaos", weight: 55 },
      ],
    },
    {
      question: "How do you currently track performance, KPIs, and team output?",
      options: [
        { label: "Live dashboard — real-time visibility", weight: 5 },
        { label: "Weekly reports — manual", weight: 20 },
        { label: "Monthly spreadsheets", weight: 35 },
        { label: "We don't — we go by gut feel", weight: 55 },
      ],
    },
    {
      question: "How long does it take to produce a client report or proposal?",
      options: [
        { label: "Under an hour — it's templated", weight: 5 },
        { label: "Half a day", weight: 25 },
        { label: "A full day", weight: 40 },
        { label: "Multiple days — it's painful", weight: 55 },
      ],
    },
    {
      question: "How much of your revenue do you estimate is lost to operational inefficiency?",
      options: [
        { label: "Very little — we're tight", weight: 5 },
        { label: "5–10%", weight: 20 },
        { label: "10–20%", weight: 35 },
        { label: "More than 20% — probably more", weight: 55 },
      ],
    },
    {
      question: "If a key team member left tomorrow, how badly would operations be affected?",
      options: [
        { label: "Minimal — processes are documented", weight: 5 },
        { label: "Some disruption — manageable", weight: 20 },
        { label: "Significant disruption", weight: 40 },
        { label: "It would be catastrophic", weight: 55 },
      ],
    },
  ],
  S5: [
    {
      question: "How much of your week is spent on tasks that don't require your specific expertise?",
      options: [
        { label: "Under 20% — I'm well leveraged", weight: 5 },
        { label: "20–40%", weight: 20 },
        { label: "40–60%", weight: 40 },
        { label: "More than 60% — I'm buried in the wrong work", weight: 55 },
      ],
    },
    {
      question: "How quickly can you get a clear picture of business performance when you need it?",
      options: [
        { label: "Instantly — live dashboards", weight: 5 },
        { label: "Within a day — someone pulls it", weight: 20 },
        { label: "A few days — it's manual", weight: 35 },
        { label: "I rarely have a clear picture", weight: 55 },
      ],
    },
    {
      question: "How effective is your current EA or PA support?",
      options: [
        { label: "Excellent — they run my schedule and comms", weight: 5 },
        { label: "Good but limited — they can't do everything", weight: 20 },
        { label: "I don't have one — I manage myself", weight: 40 },
        { label: "I need support but haven't found the right solution", weight: 55 },
      ],
    },
    {
      question: "How much time do you spend preparing for meetings vs. executing decisions?",
      options: [
        { label: "Mostly executing — prep is handled", weight: 5 },
        { label: "Balanced — I prepare myself", weight: 20 },
        { label: "Too much prep, not enough execution", weight: 40 },
        { label: "Meetings consume my week", weight: 55 },
      ],
    },
    {
      question: "How confident are you that your operational systems can scale with your ambitions?",
      options: [
        { label: "Very — we're built for scale", weight: 5 },
        { label: "Mostly — a few gaps", weight: 20 },
        { label: "Not really — we'll hit a ceiling soon", weight: 40 },
        { label: "We're already at the ceiling", weight: 55 },
      ],
    },
    {
      question: "How much strategic thinking time do you get each week?",
      options: [
        { label: "More than 10 hours — it's protected", weight: 5 },
        { label: "5–10 hours", weight: 20 },
        { label: "Under 5 hours", weight: 40 },
        { label: "Almost none — I'm reactive all week", weight: 55 },
      ],
    },
  ],
  S6: [
    {
      question: "How standardised are your processes across sites or departments?",
      options: [
        { label: "Fully standardised and documented", weight: 5 },
        { label: "Mostly — some variation", weight: 20 },
        { label: "Significant variation — inconsistent output", weight: 40 },
        { label: "Every site does it differently", weight: 55 },
      ],
    },
    {
      question: "How long does it take to onboard a new member of staff to full productivity?",
      options: [
        { label: "Under 2 weeks — we have a system", weight: 5 },
        { label: "2–4 weeks", weight: 20 },
        { label: "1–3 months", weight: 40 },
        { label: "3+ months — it's a drain on the business", weight: 55 },
      ],
    },
    {
      question: "How much management time is consumed by operational firefighting each week?",
      options: [
        { label: "Under 10% — systems handle most issues", weight: 5 },
        { label: "10–25%", weight: 20 },
        { label: "25–50%", weight: 40 },
        { label: "More than 50% — we're always firefighting", weight: 55 },
      ],
    },
    {
      question: "How integrated are your technology systems (CRM, ERP, comms, reporting)?",
      options: [
        { label: "Fully integrated — single source of truth", weight: 5 },
        { label: "Mostly connected — some manual bridges", weight: 20 },
        { label: "Siloed — lots of manual data transfer", weight: 40 },
        { label: "Fragmented — no one knows what's happening", weight: 55 },
      ],
    },
    {
      question: "How confident are you in the accuracy of your operational data?",
      options: [
        { label: "Very confident — it's automated and verified", weight: 5 },
        { label: "Fairly confident — mostly accurate", weight: 20 },
        { label: "Not confident — data quality is a problem", weight: 40 },
        { label: "We make decisions on guesswork", weight: 55 },
      ],
    },
    {
      question: "How quickly can your organisation adapt to a significant operational change?",
      options: [
        { label: "Quickly — we're agile and systemised", weight: 5 },
        { label: "Within a month with effort", weight: 20 },
        { label: "3–6 months — it's slow", weight: 40 },
        { label: "It causes major disruption every time", weight: 55 },
      ],
    },
  ],
};

// ─── Score to recommendation mapping ───────────────────────────────────────────
function getRecommendation(score: number, segmentId: string) {
  if (score >= 80) {
    return {
      band: "High Friction Zone",
      colour: "oklch(0.65 0.22 27)",
      headline: "Significant capacity is being lost every week.",
      body: "Your audit reveals multiple high-friction points that are costing you time, money, and momentum. TrueNorth can diagnose, design, and deploy systems that eliminate this friction — typically recovering 10–20 hours per week within the first 30 days.",
      cta: "Book a Free Discovery Call",
      ctaType: "enquire",
    };
  } else if (score >= 50) {
    return {
      band: "Moderate Friction Zone",
      colour: "oklch(0.75 0.16 75)",
      headline: "You're functional, but leaving capacity on the table.",
      body: "Your operations work — but inefficiency is quietly compounding. The right systems would free up meaningful time and reduce your reliance on manual effort. TrueNorth can identify the highest-leverage fixes and implement them fast.",
      cta: "See What We'd Fix First",
      ctaType: "enquire",
    };
  } else {
    return {
      band: "Well-Optimised",
      colour: "oklch(0.65 0.12 192)",
      headline: "Your operations are running well.",
      body: "You've already built solid foundations. The opportunity now is to go further — adding AI-powered intelligence, deeper automation, and scalable systems that compound your existing efficiency. TrueNorth can help you reach the next level.",
      cta: "Explore What's Possible",
      ctaType: "enquire",
    };
  }
}

// ─── Component ─────────────────────────────────────────────────────────────────
type Phase = "intro" | "segment" | "questions" | "score" | "email" | "complete";

export default function AuditTool() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [selectedSegment, setSelectedSegment] = useState<(typeof SEGMENTS)[0] | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [displayScore, setDisplayScore] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const questions = selectedSegment ? QUESTIONS[selectedSegment.id] : [];
  const progress = questions.length > 0 ? ((currentQ) / questions.length) * 100 : 0;

  // Animate score counter
  useEffect(() => {
    if (phase === "score") {
      let start = 0;
      const end = totalScore;
      const duration = 1800;
      const step = Math.ceil(end / (duration / 16));
      const timer = setInterval(() => {
        start = Math.min(start + step, end);
        setDisplayScore(start);
        if (start >= end) clearInterval(timer);
      }, 16);
      return () => clearInterval(timer);
    }
  }, [phase, totalScore]);

  const handleSegmentSelect = (segment: (typeof SEGMENTS)[0]) => {
    setAnimating(true);
    setTimeout(() => {
      setSelectedSegment(segment);
      setPhase("questions");
      setCurrentQ(0);
      setAnswers([]);
      setAnimating(false);
    }, 300);
  };

  const handleAnswer = (weight: number) => {
    const newAnswers = [...answers, weight];
    setAnimating(true);
    setTimeout(() => {
      setAnswers(newAnswers);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
      } else {
        // Calculate score: sum of weights, normalised to 0–100
        const maxPossible = questions.length * 55;
        const raw = newAnswers.reduce((a, b) => a + b, 0);
        const score = Math.round((raw / maxPossible) * 100);
        setTotalScore(score);
        setPhase("score");
      }
      setAnimating(false);
    }, 300);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);

    // Determine top friction areas (questions with highest weight answers)
    const frictionAreas = questions
      .map((q, i) => ({ question: q.question.slice(0, 50), weight: answers[i] || 0 }))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3)
      .map((a) => a.question);

    const recommendation = getRecommendation(totalScore, selectedSegment?.id || "");

    try {
      await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segment: selectedSegment?.id,
          segment_label: selectedSegment?.label,
          efficiency_score: totalScore,
          score_band: recommendation.band,
          top_friction_areas: frictionAreas,
          email,
          timestamp: new Date().toISOString(),
          source: "truenorth-website-audit",
        }),
      });
    } catch {
      // Fail silently — don't block the user experience
    }

    setSubmitting(false);
    setPhase("complete");
  };

  const handleReset = () => {
    setPhase("intro");
    setSelectedSegment(null);
    setCurrentQ(0);
    setAnswers([]);
    setTotalScore(0);
    setDisplayScore(0);
    setEmail("");
  };

  const recommendation = selectedSegment ? getRecommendation(totalScore, selectedSegment.id) : null;

  return (
    <section
      id="audit"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "oklch(0.10 0.04 240)" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.65 0.12 192 / 4%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.65 0.12 192 / 4%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, oklch(0.65 0.12 192 / 6%) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-12 animate-on-scroll">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: "oklch(0.65 0.12 192)" }} />
            <span className="section-label">03 — Operations Audit</span>
          </div>
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "oklch(0.92 0.01 220)",
              letterSpacing: "-0.02em",
            }}
          >
            How Much Is Inefficiency{" "}
            <span className="gradient-text-cyan">Costing You?</span>
          </h2>
          <p
            className="max-w-2xl"
            style={{ color: "oklch(0.65 0.03 220)", fontSize: "1.05rem", lineHeight: "1.7" }}
          >
            Take the 60-second audit. Get a personalised efficiency score and find out exactly where TrueNorth can recover your time and margin.
          </p>
        </div>

        {/* Audit card */}
        <div
          className="max-w-3xl mx-auto rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.14 0.04 240)",
            border: "1px solid oklch(1 0 0 / 10%)",
            boxShadow: "0 24px 80px oklch(0 0 0 / 40%)",
          }}
        >
          {/* Progress bar */}
          {phase === "questions" && (
            <div className="h-1 w-full" style={{ background: "oklch(1 0 0 / 8%)" }}>
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, oklch(0.65 0.12 192), oklch(0.75 0.16 75))",
                }}
              />
            </div>
          )}

          <div
            className="p-8 md:p-12 transition-opacity duration-300"
            style={{ opacity: animating ? 0 : 1 }}
          >
            {/* ── INTRO ── */}
            {phase === "intro" && (
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{ background: "oklch(0.65 0.12 192 / 12%)", border: "1px solid oklch(0.65 0.12 192 / 30%)" }}
                >
                  <Zap size={28} style={{ color: "oklch(0.75 0.14 192)" }} />
                </div>
                <h3
                  className="font-display font-bold mb-3"
                  style={{ fontSize: "1.75rem", color: "oklch(0.92 0.01 220)", letterSpacing: "-0.02em" }}
                >
                  Your Operations Efficiency Audit
                </h3>
                <p
                  className="mb-8 max-w-lg mx-auto"
                  style={{ color: "oklch(0.65 0.03 220)", lineHeight: "1.7" }}
                >
                  7 questions. 60 seconds. A personalised score that shows you exactly where time and money are being lost — and what to do about it.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
                  {[
                    { icon: <Clock size={14} />, label: "60 seconds" },
                    { icon: <CheckCircle size={14} />, label: "Personalised score" },
                    { icon: <Zap size={14} />, label: "Instant results" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2" style={{ color: "oklch(0.65 0.12 192)" }}>
                      {item.icon}
                      <span className="font-mono-tn text-xs" style={{ color: "oklch(0.65 0.03 220)" }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setPhase("segment")}
                  className="btn-primary-tn inline-flex items-center gap-2 group"
                >
                  Start the Audit
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}

            {/* ── SEGMENT SELECTOR ── */}
            {phase === "segment" && (
              <div>
                <p className="font-mono-tn text-xs mb-2" style={{ color: "oklch(0.65 0.12 192)" }}>
                  STEP 1 OF 7
                </p>
                <h3
                  className="font-display font-bold mb-2"
                  style={{ fontSize: "1.4rem", color: "oklch(0.92 0.01 220)", letterSpacing: "-0.02em" }}
                >
                  Which best describes you?
                </h3>
                <p className="mb-8 text-sm" style={{ color: "oklch(0.55 0.03 220)" }}>
                  Your audit is tailored to your situation.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {SEGMENTS.map((seg) => (
                    <button
                      key={seg.id}
                      onClick={() => handleSegmentSelect(seg)}
                      className="text-left p-4 rounded-xl transition-all duration-200 group"
                      style={{
                        background: "oklch(0.18 0.04 240)",
                        border: "1px solid oklch(1 0 0 / 8%)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.65 0.12 192 / 50%)";
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.20 0.05 240)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 8%)";
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.18 0.04 240)";
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-xl">{seg.icon}</span>
                        <div>
                          <p className="font-display font-semibold text-sm mb-0.5" style={{ color: "oklch(0.88 0.01 220)" }}>
                            {seg.label}
                          </p>
                          <p className="text-xs" style={{ color: "oklch(0.50 0.03 220)" }}>
                            {seg.description}
                          </p>
                        </div>
                        <ChevronRight
                          size={14}
                          className="ml-auto mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color: "oklch(0.65 0.12 192)", flexShrink: 0 }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── QUESTIONS ── */}
            {phase === "questions" && selectedSegment && questions[currentQ] && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <p className="font-mono-tn text-xs" style={{ color: "oklch(0.65 0.12 192)" }}>
                    QUESTION {currentQ + 1} OF {questions.length}
                  </p>
                  <span
                    className="font-mono-tn text-xs px-2 py-1 rounded"
                    style={{
                      background: "oklch(0.65 0.12 192 / 10%)",
                      color: "oklch(0.65 0.12 192)",
                    }}
                  >
                    {selectedSegment.icon} {selectedSegment.label}
                  </span>
                </div>
                <h3
                  className="font-display font-bold mb-8"
                  style={{ fontSize: "1.3rem", color: "oklch(0.92 0.01 220)", lineHeight: "1.4", letterSpacing: "-0.01em" }}
                >
                  {questions[currentQ].question}
                </h3>
                <div className="flex flex-col gap-3">
                  {questions[currentQ].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(option.weight)}
                      className="text-left p-4 rounded-xl transition-all duration-200 group"
                      style={{
                        background: "oklch(0.18 0.04 240)",
                        border: "1px solid oklch(1 0 0 / 8%)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "oklch(0.65 0.12 192 / 50%)";
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.20 0.05 240)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "oklch(1 0 0 / 8%)";
                        (e.currentTarget as HTMLElement).style.background = "oklch(0.18 0.04 240)";
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="font-mono-tn text-xs w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "oklch(0.65 0.12 192 / 10%)",
                            color: "oklch(0.65 0.12 192)",
                          }}
                        >
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="text-sm" style={{ color: "oklch(0.80 0.02 220)" }}>
                          {option.label}
                        </span>
                        <ChevronRight
                          size={14}
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          style={{ color: "oklch(0.65 0.12 192)" }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── SCORE REVEAL ── */}
            {phase === "score" && recommendation && (
              <div className="text-center">
                <p className="font-mono-tn text-xs mb-6" style={{ color: "oklch(0.65 0.12 192)" }}>
                  YOUR AUDIT RESULT
                </p>

                {/* Score dial */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <svg width="160" height="160" viewBox="0 0 160 160">
                    <circle cx="80" cy="80" r="68" fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth="8" />
                    <circle
                      cx="80"
                      cy="80"
                      r="68"
                      fill="none"
                      stroke={recommendation.colour}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(displayScore / 100) * 427} 427`}
                      transform="rotate(-90 80 80)"
                      style={{ transition: "stroke-dasharray 0.1s linear" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span
                      className="font-display font-bold"
                      style={{ fontSize: "2.5rem", color: recommendation.colour, letterSpacing: "-0.04em" }}
                    >
                      {displayScore}
                    </span>
                    <span className="font-mono-tn text-xs" style={{ color: "oklch(0.50 0.03 220)" }}>
                      / 100
                    </span>
                  </div>
                </div>

                <div
                  className="inline-block px-4 py-1.5 rounded-full mb-4 font-mono-tn text-xs"
                  style={{
                    background: `${recommendation.colour.replace(")", " / 12%)")}`,
                    border: `1px solid ${recommendation.colour.replace(")", " / 30%)")}`,
                    color: recommendation.colour,
                  }}
                >
                  {recommendation.band}
                </div>

                <h3
                  className="font-display font-bold mb-3"
                  style={{ fontSize: "1.4rem", color: "oklch(0.92 0.01 220)", letterSpacing: "-0.02em" }}
                >
                  {recommendation.headline}
                </h3>
                <p
                  className="mb-8 max-w-lg mx-auto text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.03 220)" }}
                >
                  {recommendation.body}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => setPhase("email")}
                    className="btn-primary-tn inline-flex items-center gap-2 group"
                  >
                    Get My Full Report
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => {
                      const section = document.getElementById("contact");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-secondary-tn inline-flex items-center gap-2"
                  >
                    {recommendation.cta}
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-4 flex items-center gap-1.5 mx-auto text-xs transition-colors"
                  style={{ color: "oklch(0.45 0.03 220)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "oklch(0.65 0.03 220)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "oklch(0.45 0.03 220)")}
                >
                  <RefreshCw size={11} />
                  Retake for a different segment
                </button>
              </div>
            )}

            {/* ── EMAIL CAPTURE ── */}
            {phase === "email" && recommendation && (
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                  style={{ background: "oklch(0.65 0.12 192 / 12%)", border: "1px solid oklch(0.65 0.12 192 / 30%)" }}
                >
                  <AlertCircle size={24} style={{ color: "oklch(0.75 0.14 192)" }} />
                </div>
                <h3
                  className="font-display font-bold mb-3"
                  style={{ fontSize: "1.4rem", color: "oklch(0.92 0.01 220)", letterSpacing: "-0.02em" }}
                >
                  Where shall we send your full report?
                </h3>
                <p
                  className="mb-8 max-w-md mx-auto text-sm"
                  style={{ color: "oklch(0.55 0.03 220)", lineHeight: "1.7" }}
                >
                  We'll send a personalised breakdown of your audit results, your top friction areas, and the specific TrueNorth systems that would recover your time and margin.
                </p>
                <form onSubmit={handleEmailSubmit} className="max-w-sm mx-auto flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all text-center"
                    style={{
                      background: "oklch(0.18 0.04 240)",
                      border: "1px solid oklch(1 0 0 / 12%)",
                      color: "oklch(0.88 0.01 220)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "oklch(0.65 0.12 192 / 50%)")}
                    onBlur={(e) => (e.target.style.borderColor = "oklch(1 0 0 / 12%)")}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary-tn flex items-center justify-center gap-2 group"
                  >
                    {submitting ? "Sending..." : "Send My Report"}
                    {!submitting && (
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhase("score")}
                    className="text-xs"
                    style={{ color: "oklch(0.45 0.03 220)" }}
                  >
                    ← Back to results
                  </button>
                </form>
              </div>
            )}

            {/* ── COMPLETE ── */}
            {phase === "complete" && recommendation && (
              <div className="text-center">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
                  style={{ background: "oklch(0.65 0.12 192 / 12%)", border: "1px solid oklch(0.65 0.12 192 / 30%)" }}
                >
                  <CheckCircle size={28} style={{ color: "oklch(0.75 0.14 192)" }} />
                </div>
                <h3
                  className="font-display font-bold mb-3"
                  style={{ fontSize: "1.75rem", color: "oklch(0.92 0.01 220)", letterSpacing: "-0.02em" }}
                >
                  Report on its way.
                </h3>
                <p
                  className="mb-8 max-w-md mx-auto text-sm"
                  style={{ color: "oklch(0.65 0.03 220)", lineHeight: "1.7" }}
                >
                  Check your inbox — your personalised efficiency report is incoming. In the meantime, explore what TrueNorth has already built.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      const section = document.getElementById("portfolio");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-primary-tn inline-flex items-center gap-2 group"
                  >
                    See What We've Built
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => {
                      const section = document.getElementById("contact");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="btn-secondary-tn inline-flex items-center gap-2"
                  >
                    Book a Discovery Call
                  </button>
                </div>
                <button
                  onClick={handleReset}
                  className="mt-6 flex items-center gap-1.5 mx-auto text-xs transition-colors"
                  style={{ color: "oklch(0.45 0.03 220)" }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "oklch(0.65 0.03 220)")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "oklch(0.45 0.03 220)")}
                >
                  <RefreshCw size={11} />
                  Run the audit for a different segment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
