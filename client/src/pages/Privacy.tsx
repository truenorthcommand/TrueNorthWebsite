import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]" style={{ color: "rgba(240,244,248,0.8)" }}>
      <Navbar />
      <div className="container py-24 max-w-3xl mx-auto" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}>
        <h1
          className="font-display text-3xl md:text-4xl font-bold mb-8"
          style={{ color: "rgb(240,244,248)" }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm mb-8" style={{ color: "rgba(240,244,248,0.4)" }}>
          Last updated: 12 March 2026
        </p>

        <div className="space-y-8 text-sm" style={{ color: "rgba(240,244,248,0.7)" }}>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>1. Introduction</h2>
            <p>TrueNorth Operations Group ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website truenorthos.co.uk and use our services.</p>
            <p className="mt-2">Company No. 16854356 — Registered in England and Wales.</p>
            <p className="mt-2">Registered address: Unit 2 Meadow View Industrial Estate, Ruckinge, Ashford, Kent, TN26 2NR.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>2. Information We Collect</h2>
            <p>We collect information you provide directly when you:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Fill out our contact form (name, email, company, message)</li>
              <li>Complete our free operations audit (name, email, audit responses)</li>
              <li>Leave comments on our blog (name, email, comment content)</li>
              <li>Book a discovery call through our scheduling system</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Respond to your enquiries and provide requested services</li>
              <li>Deliver personalised audit reports and operational recommendations</li>
              <li>Improve our website, services, and user experience</li>
              <li>Send relevant follow-up communications (only with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>4. Data Storage & Security</h2>
            <p>Your data is stored securely using industry-standard encryption and hosted on trusted cloud infrastructure. We retain your personal data only for as long as necessary to fulfil the purposes outlined in this policy or as required by law.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>5. Third-Party Services</h2>
            <p>We may use the following third-party services to operate our business:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Email delivery services (for sending audit reports and communications)</li>
              <li>Analytics services (to understand site usage patterns)</li>
              <li>Cloud hosting and database services</li>
            </ul>
            <p className="mt-2">These services are subject to their own privacy policies and we only share the minimum data necessary for them to function.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>6. Your Rights (UK GDPR)</h2>
            <p>Under the UK General Data Protection Regulation, you have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, contact us at the details below.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>7. Cookies</h2>
            <p>Our website uses essential cookies required for the site to function correctly. We do not use tracking or advertising cookies without your explicit consent.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>8. Contact Us</h2>
            <p>If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:</p>
            <p className="mt-2">Email: matt@truenorthoperationsgroup.com</p>
            <p>Address: Unit 2 Meadow View Industrial Estate, Ruckinge, Ashford, Kent, TN26 2NR</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
