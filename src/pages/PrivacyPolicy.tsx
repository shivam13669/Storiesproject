import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navigation />
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto p-8 md:p-12">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-600 text-lg">
              Last Updated: <strong>November, 2025</strong>
            </p>
          </header>

          <article className="prose prose-slate max-w-none space-y-6">
            <section className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                Welcome to StoriesByFoot ("we," "our," or "us"). This Privacy Policy explains how we collect, use, store, and protect your personal information when you visit or use our website <a href="https://storiesbyfoot.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">https://storiesbyfoot.com</a> (the "Website") and any related features, services, or content (collectively, the "Services"). By using our Website, you consent to the practices described in this Privacy Policy. If you do not agree with any part of this Policy, please discontinue using our Services.
              </p>
              <p className="text-slate-700 leading-relaxed">
                StoriesByFoot, together with its trusted service partners, manages and safeguards personal information collected through this Website in accordance with this Privacy Policy and the Terms and Conditions.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">1. Information We Collect</h2>
              <p className="text-slate-700 leading-relaxed">
                We collect personal and non-personal information from you in several ways, including:
              </p>

              <div className="space-y-3 text-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">1.1. Information You Provide Voluntarily</h3>
                  <p className="mb-2">When you:</p>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>Register an account or subscribe to our newsletter</li>
                    <li>Make a booking or submit a travel inquiry</li>
                    <li>Contact us via email or chat</li>
                    <li>Submit reviews, stories, or images</li>
                  </ul>
                  <p className="mt-3">The information you provide may include:</p>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Contact number</li>
                    <li>Payment or billing details (processed via secure gateways)</li>
                    <li>Travel preferences and booking details</li>
                    <li>Any content you share (such as reviews, photos, or stories)</li>
                  </ul>
                </div>

                <div className="pt-3">
                  <h3 className="font-semibold text-slate-800 mb-2">1.2. Information Collected Automatically</h3>
                  <p className="mb-2">When you visit our Website, we may automatically collect:</p>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>IP address and browser type</li>
                    <li>Device information (mobile/desktop, OS)</li>
                    <li>Pages visited, time spent, and referring URLs</li>
                    <li>Cookie data and analytics identifiers</li>
                  </ul>
                  <p className="mt-3">We use this data for website optimization, analytics, and personalized user experiences.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">2. Use of Collected Information</h2>
              <p className="text-slate-700 leading-relaxed mb-2">
                We use your information for legitimate business purposes, including:
              </p>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>To process bookings, payments, and confirmations</li>
                <li>To communicate with you about inquiries, trips, or offers</li>
                <li>To personalize your website experience and show relevant destinations</li>
                <li>To send newsletters, travel updates, or promotional materials (you may opt out anytime)</li>
                <li>To improve our Website, security, and services</li>
                <li>To comply with legal or regulatory obligations</li>
              </ul>
              <p className="text-slate-700 leading-relaxed pt-3">
                We do not sell or rent your personal data to any third parties. We process personal information based on your consent, contractual necessity (to provide booked services), or legitimate business interests such as service improvement and fraud prevention.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">3. Cookies and Tracking Technologies</h2>
              <p className="text-slate-700 leading-relaxed mb-2">
                Our Website uses cookies and similar tracking tools to:
              </p>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>Enable core functionality (e.g., login sessions, preferences)</li>
                <li>Analyze visitor interactions using tools like Google Analytics</li>
                <li>Provide personalized recommendations and advertisements</li>
              </ul>
              <p className="text-slate-700 leading-relaxed pt-3">
                You can manage or disable cookies in your browser settings, though some features of the Website may not function properly if cookies are disabled. By using this Website, you acknowledge that you have read and agreed to the complete Cookie Policy and consent to the use of cookies and related technologies as described therein.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">4. Sharing and Disclosure of Information</h2>
              <p className="text-slate-700 leading-relaxed">
                We may share your information in the following situations:
              </p>

              <div className="space-y-4 text-slate-700">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-2">4.1. With Service Providers and Partners</h3>
                  <p className="mb-2">To fulfill your bookings and provide travel services, we may share limited necessary information with trusted partners, such as:</p>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>Hotels, airlines, and tour operators</li>
                    <li>Payment processors and verification services</li>
                    <li>IT and customer support providers</li>
                  </ul>
                  <p className="mt-3">All such partners are bound by confidentiality and data protection obligations.</p>
                </div>

                <div className="pt-3">
                  <h3 className="font-semibold text-slate-800 mb-2">4.2. Legal Obligations</h3>
                  <p className="mb-2">We may disclose your information if required by law, court order, or government authority to:</p>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>Comply with legal requirements</li>
                    <li>Protect our rights or prevent fraud</li>
                    <li>Respond to legitimate law enforcement requests</li>
                  </ul>
                </div>

                <div className="pt-3">
                  <h3 className="font-semibold text-slate-800 mb-2">4.3. Business Transfers</h3>
                  <p>If StoriesByFoot undergoes a merger, acquisition, or reorganization, your data may be transferred as part of that transaction, but your privacy rights will remain protected.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">5. Data Storage and Security</h2>
              <p className="text-slate-700 leading-relaxed mb-2">
                We employ reasonable administrative, technical, and physical safeguards to protect your information from unauthorized access, loss, misuse, or alteration. Sensitive information (like payment details) is processed through secure, PCI-DSS compliant payment gateways.
              </p>
              <p className="text-slate-700 leading-relaxed">
                While we strive to protect your data, no online platform can guarantee absolute security. You use our Website at your own risk.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">6. Your Rights and Choices</h2>
              <p className="text-slate-700 leading-relaxed mb-2">
                Depending on your jurisdiction, you may have the right to:
              </p>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>Access, correct, or delete your personal data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Request details on how your information is used</li>
              </ul>
              <p className="text-slate-700 leading-relaxed pt-3">
                You can exercise these rights by emailing us at <a href="mailto:storiesbyfoot@gmail.com" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">storiesbyfoot@gmail.com</a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">7. Data Retention</h2>
              <p className="text-slate-700 leading-relaxed mb-2">
                We retain your information only for as long as necessary to:
              </p>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>Provide our services and process transactions</li>
                <li>Fulfill legal, tax, or accounting obligations</li>
                <li>Resolve disputes and enforce our Terms</li>
              </ul>
              <p className="text-slate-700 leading-relaxed pt-3">
                Once no longer needed, data is securely deleted or anonymized.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">8. Third-Party Links</h2>
              <p className="text-slate-700 leading-relaxed">
                Our Website may contain links to external websites (e.g., hotel partners, tourism boards). StoriesByFoot is not responsible for the privacy practices or content of such third-party sites. We encourage you to review their policies before interacting or sharing information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">9. Children's Privacy</h2>
              <p className="text-slate-700 leading-relaxed mb-2">
                Our Services are primarily intended for individuals who are 18 years of age or older. If you are under 18 years of age, you may use our Services only under the supervision and consent of a parent or legal guardian.
              </p>
              <p className="text-slate-700 leading-relaxed">
                We do not knowingly collect or store personal information from minors. If we become aware that data from a child has been collected without appropriate consent, we will delete such information promptly and take reasonable steps to ensure compliance with our prevailing privacy standards.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">10. International Users</h2>
              <p className="text-slate-700 leading-relaxed">
                If you are accessing our Website from outside India, please note that your information may be transferred to and processed in India, where data protection laws may differ from your jurisdiction. By using our Website, you consent to such transfers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">11. Changes to this Privacy Policy</h2>
              <p className="text-slate-700 leading-relaxed">
                StoriesByFoot reserves the right to modify or update this Privacy Policy at any time. All changes will be posted on this page with an updated "Last Updated" date. Your continued use of the Website after changes signifies acceptance of the revised Policy.
              </p>
            </section>

            <section className="space-y-4 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-800">12. Contact Information</h2>
              <div className="text-slate-700 leading-relaxed space-y-2">
                <p>📧 Email: <a href="mailto:contact@storiesbyfoot.com" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">contact@storiesbyfoot.com</a>, <a href="mailto:storiesbyfoot@gmail.com" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">storiesbyfoot@gmail.com</a></p>
                <p>🌐 Website: <a href="https://storiesbyfoot.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">https://storiesbyfoot.com</a></p>
                <p>📍 Registered Office: 91, GK Crystal Home, KL Highway, SAS Nagar, Punjab - 140307</p>
                <p>📞 Customer Support: <a href="tel:+916205129118" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">+916205129118</a>, <a href="tel:+916283620764" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">+916283620764</a></p>
              </div>
            </section>

            <section className="space-y-4 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-800">Disclaimer</h2>
              <p className="text-slate-700 leading-relaxed">
                StoriesByFoot values your trust and takes your privacy seriously. While we adopt best practices to protect your information, no electronic storage or transmission method is completely secure. Use of our Website implies your acceptance of this inherent risk.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
