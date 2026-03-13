import { useState } from "react";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const QUESTIONS = [
  { id: "manual_tasks", label: "How many hours per week does your team spend on manual, repetitive tasks?", options: ["Less than 2hrs", "2-5hrs", "5-10hrs", "10hrs+"] },
  { id: "tools_connected", label: "Are your key business tools (CRM, email, finance, PM) connected and talking to each other?", options: ["Fully connected", "Partially connected", "Mostly manual", "No system in place"] },
  { id: "reporting", label: "How do you currently produce business reports and dashboards?", options: ["Automated in real-time", "Semi-automated", "Manual spreadsheets", "We do not report regularly"] },
  { id: "bottleneck", label: "What is your biggest operational bottleneck right now?", options: ["Hiring / capacity", "Inconsistent processes", "Poor data visibility", "Too many tools / no integration"] },
  { id: "ai_usage", label: "How is your business currently using AI?", options: ["Strategically across operations", "Ad hoc / experimenting", "Barely / not at all", "Actively looking to start"] },
];

export default function AuditTool() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitAudit = trpc.audit.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const allAnswered = QUESTIONS.every((q) => answers[q.id]);
  const progress = (Object.keys(answers).length / QUESTIONS.length) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered || !name || !email) return;
    submitAudit.mutate({ name, email, answers });
  };

  return (
    <section id="audit" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="text-center mb-14 animate-on-scroll">
          <p className="section-label mb-3">Free Audit</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#f0f4f8" }}>
            Discover your operational gaps
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(240,244,248,0.55)" }}>
            5 questions. 2 minutes. A personalised report showing exactly where AI and automation can save you time and money.
          </p>
        </div>
        <div className="glossy-card p-8 md:p-10 max-w-3xl mx-auto animate-on-scroll">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "#00FFFF" }} />
              <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "#f0f4f8" }}>Audit submitted</h3>
              <p style={{ color: "rgba(240,244,248,0.6)" }}>We will review your responses and send a personalised report within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div>
                <div className="flex justify-between text-xs mb-2" style={{ color: "rgba(240,244,248,0.4)" }}>
                  <span>{Object.keys(answers).length} of {QUESTIONS.length} answered</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #00FFFF, #14b8a6)" }} />
                </div>
              </div>
              {QUESTIONS.map((q) => (
                <div key={q.id} className="flex flex-col gap-3">
                  <p className="text-sm font-medium" style={{ color: "#f0f4f8" }}>{q.label}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt) => (
                      <button key={opt} type="button" onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                        className="text-left px-4 py-3 rounded-xl text-sm transition-all duration-200"
                        style={{
                          background: answers[q.id] === opt ? "rgba(0,255,255,0.1)" : "rgba(255,255,255,0.04)",
                          border: answers[q.id] === opt ? "1px solid rgba(0,255,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                          color: answers[q.id] === opt ? "#00FFFF" : "rgba(240,244,248,0.65)",
                        }}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="px-4 py-3 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8" }} />
                <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="px-4 py-3 rounded-lg text-sm outline-none" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8" }} />
              </div>
              <button type="submit" disabled={!allAnswered || !name || !email || submitAudit.isPending} className="btn-primary justify-center" style={{ opacity: (!allAnswered || !name || !email) ? 0.5 : 1 }}>
                {submitAudit.isPending ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : <>Get My Free Report <ArrowRight size={16} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
