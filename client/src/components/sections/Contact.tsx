import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const AUDIENCE_OPTIONS = ["Solopreneur", "Small Business (1-10)", "SME (10-50)", "Scale-up (50-200)", "Enterprise (200+)", "Other"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", audience: "" });
  const [submitted, setSubmitted] = useState(false);

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => setSubmitted(true),
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContact.mutate(form);
  };

  const inputStyle = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8" };

  return (
    <section id="contact" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="text-center mb-14 animate-on-scroll">
          <p className="section-label mb-3">Contact</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#f0f4f8" }}>Start a conversation</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(240,244,248,0.55)" }}>Tell us about your business and what you are trying to solve. We will respond within 24 hours.</p>
        </div>
        <div className="glossy-card p-8 md:p-10 max-w-2xl mx-auto animate-on-scroll">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "#00FFFF" }} />
              <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "#f0f4f8" }}>Message received</h3>
              <p style={{ color: "rgba(240,244,248,0.6)" }}>We will be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your name" value={form.name} onChange={set("name")} required className="px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
                <input type="email" placeholder="Your email" value={form.email} onChange={set("email")} required className="px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
              </div>
              <input type="text" placeholder="Company (optional)" value={form.company} onChange={set("company")} className="px-4 py-3 rounded-lg text-sm outline-none" style={inputStyle} />
              <select value={form.audience} onChange={set("audience")} className="px-4 py-3 rounded-lg text-sm outline-none" style={{ ...inputStyle, color: form.audience ? "#f0f4f8" : "rgba(240,244,248,0.4)" }}>
                <option value="" disabled>What best describes you?</option>
                {AUDIENCE_OPTIONS.map((o) => <option key={o} value={o} style={{ background: "#0d1117" }}>{o}</option>)}
              </select>
              <textarea placeholder="What are you trying to solve?" value={form.message} onChange={set("message")} required rows={4} className="px-4 py-3 rounded-lg text-sm outline-none resize-none" style={inputStyle} />
              <button type="submit" disabled={submitContact.isPending} className="btn-primary justify-center">
                {submitContact.isPending ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={15} /> Send Message</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
