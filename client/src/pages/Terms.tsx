import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]" style={{ color: "rgba(240,244,248,0.8)" }}>
      <Navbar />
      <div className="container py-24 max-w-3xl mx-auto" style={{ fontFamily: "Inter, sans-serif", lineHeight: 1.8 }}>
        <h1
          className="font-display text-3xl md:text-4xl font-bold mb-8"
          style={{ color: "rgb(240,244,248)" }}
        >
          Terms of Service
        </h1>
        <p className="text-sm mb-8" style={{ color: "rgba(240,244,248,0.4)" }}>
          Last updated: 12 March 2026
        </p>

        <div className="space-y-8 text-sm" style={{ color: "rgba(240,244,248,0.7)" }}>
          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>1. Agreement to Terms</h2>
            <p>By accessing and using the TrueNorth Operations Group website (truenorthos.co.uk) and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
            <p className="mt-2">TrueNorth Operations Group is a company registered in England and Wales (Company No. 16854356), with registered address at Unit 2 Meadow View Industrial Estate, Ruckinge, Ashford, Kent, TN26 2NR.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>2. Services</h2>
            <p>TrueNorth Operations Group provides AI-powered operational systems design, automation consulting, and related technology services. Our website offers:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Information about our services and capabilities</li>
              <li>A free operational efficiency audit tool</li>
              <li>Blog content on operations, automation, and AI</li>
              <li>Contact and enquiry forms</li>
              <li>A marketplace of pre-built solutions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>3. Use of the Website</h2>
            <p>You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of, this site by any third party. Prohibited behaviour includes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Harassing or causing distress to any person</li>
              <li>Transmitting obscene or offensive content</li>
              <li>Disrupting the normal flow of dialogue on our platform</li>
              <li>Attempting to gain unauthorised access to our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>4. Intellectual Property</h2>
            <p>All content on this website — including text, graphics, logos, images, and software — is the property of TrueNorth Operations Group or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from any content without our express written permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>5. Free Audit Tool</h2>
            <p>The operational efficiency audit tool provided on this website is offered free of charge for informational purposes only. The results and recommendations generated are indicative and should not be considered as professional consultancy advice. For tailored recommendations, please contact us to arrange a full consultation.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>6. Blog & Comments</h2>
            <p>Our blog is provided for informational purposes. Comments submitted are subject to moderation. We reserve the right to remove any comment that is spam, offensive, defamatory, or otherwise inappropriate. By submitting a comment, you grant us a non-exclusive licence to display it on our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>7. Limitation of Liability</h2>
            <p>TrueNorth Operations Group shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of this website. Our total liability in any matter arising out of or in connection with these terms is limited to the amount paid by you (if any) for the specific service in question.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>8. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. These links are provided for your convenience and do not signify endorsement. We have no control over the content of linked sites and accept no responsibility for them.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>9. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Your continued use of the website after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>10. Governing Law</h2>
            <p>These terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3" style={{ color: "rgb(240,244,248)" }}>11. Contact</h2>
            <p>For questions about these Terms of Service, please contact us:</p>
            <p className="mt-2">Email: matt@truenorthoperationsgroup.com</p>
            <p>Address: Unit 2 Meadow View Industrial Estate, Ruckinge, Ashford, Kent, TN26 2NR</p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
