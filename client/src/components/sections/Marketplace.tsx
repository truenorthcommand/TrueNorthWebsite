import { useState } from "react";
import { ShoppingBag, Send } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Marketplace() {
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitFeedback = trpc.marketplace.submitFeedback.useMutation({
    onSuccess: () => { setSubmitted(true); setEmail(""); setRequest(""); },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !request) return;
    submitFeedback.mutate({ email, request });
  };

  return (
    <section id="marketplace" className="relative py-24" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="text-center mb-14 animate-on-scroll">
          <p className="section-label mb-3">Marketplace</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#f0f4f8" }}>
            Tools &amp; Products
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(240,244,248,0.55)" }}>
            Ready-to-deploy AI tools, templates, and automation packages. Built by TrueNorth. Owned by you.
          </p>
        </div>

        <div className="glossy-card p-12 text-center animate-on-scroll max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,255,255,0.08)", border: "1px solid rgba(0,255,255,0.2)" }}>
              <ShoppingBag size={28} style={{ color: "#00FFFF" }} />
            </div>
          </div>
          <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "#f0f4f8" }}>Coming Soon</h3>
          <p className="text-base mb-8" style={{ color: "rgba(240,244,248,0.55)" }}>
            The TrueNorth Marketplace is in development. Tell us what you'd like to see — your request shapes what we build first.
          </p>

          {submitted ? (
            <div className="rounded-xl p-4" style={{ background: "rgba(0,255,255,0.06)", border: "1px solid rgba(0,255,255,0.2)" }}>
              <p className="font-display font-medium" style={{ color: "#00FFFF" }}>Request received — thank you.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8", fontFamily: "'Inter', sans-serif" }}
              />
              <input
                type="text"
                placeholder="What would you like to see in the marketplace?"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f0f4f8", fontFamily: "'Inter', sans-serif" }}
              />
              <button type="submit" disabled={submitFeedback.isPending} className="btn-primary justify-center">
                {submitFeedback.isPending ? "Sending..." : <><Send size={15} /> Submit Request</>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
