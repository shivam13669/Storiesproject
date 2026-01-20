import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function TermsAndConditionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-emerald-50 text-slate-900">
      <Navigation />
      <main className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-4xl mx-auto p-8 md:p-12">
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-slate-600 text-lg">
              Last Updated: <strong>November, 2025</strong>
            </p>
          </header>

          <article className="prose prose-slate max-w-none space-y-6">
            <section className="space-y-4">
              <p className="text-slate-700 leading-relaxed">
                Welcome to StoriesByFoot ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your access to and use of our website <a href="https://storiesbyfoot.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">https://storiesbyfoot.com</a> (the "Website") and all related features, services, and content provided by StoriesByFoot (collectively, the "Services").
              </p>
              <p className="text-slate-700 leading-relaxed">
                By accessing or using our Website, you agree to comply with and be bound by these Terms. If you do not agree, please refrain from using our Website or Services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">1. Overview</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>StoriesByFoot is a travel-based platform that provides destination information, travel inspiration, and booking assistance for tours, stays, and experiences.</li>
                <li>Some services may be offered directly by StoriesByFoot, while others are facilitated through verified third-party providers ("Vendors").</li>
                <li>These Terms apply to all visitors, users, and registered members of StoriesByFoot.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">2. Eligibility</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>You must be at least 18 years old to access or use our Services. If you are under 18 years of age, you may only use our Services with the consent and supervision of a parent or legal guardian who accepts these Terms on your behalf.</li>
                <li>By using this Website, you represent that you have the legal capacity to enter into binding agreements.</li>
                <li>If you are accessing this Website on behalf of another person or organization, you confirm that you have full authority to do so.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">3. Bookings and Payments</h2>
              <div className="space-y-3 text-slate-700">
                <div>
                  <h3 className="font-semibold mb-1">3.1. Booking Confirmation</h3>
                  <p className="leading-relaxed">All bookings made through StoriesByFoot are subject to availability and confirmation. You will receive an email confirmation once a booking is successfully processed by the Vendor.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">3.2. Pricing and Currency</h3>
                  <p className="leading-relaxed">All prices displayed on our Website are in Indian Rupees (INR) unless otherwise specified or selected. Prices are subject to change at any time without prior notice. Final prices will be confirmed before completing payment.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">3.3. Payment Policy</h3>
                  <p className="leading-relaxed">Full or partial payment (as specified) must be made at the time of booking. Payments are processed securely through our authorized payment gateways.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">3.5. Amendments and Modifications</h3>
                  <p className="leading-relaxed">Changes to bookings (e.g., travel dates, destination, or number of guests) are subject to availability, Vendor approval, and applicable modification charges.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">3.6. Right to Refuse or Cancel Bookings</h3>
                  <p className="leading-relaxed">StoriesByFoot reserves the right to refuse or cancel any booking at its discretion if fraud, payment issues, or misuse is suspected, or if the transaction violates applicable laws or our internal risk policies.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">4. Cancellation and Refund Policy</h2>
              <div className="space-y-3 text-slate-700">
                <ul className="space-y-2 list-disc list-outside pl-6">
                  <li>Cancellations and refunds are subject to the terms and policies of the respective Vendor (e.g., hotels, tour operators, transport partners).</li>
                  <li>StoriesByFoot may charge a non-refundable service or convenience fee.</li>
                  <li>Refunds, if applicable, will be processed to the original mode of payment within 7–14 working days, subject to bank processing times.</li>
                  <li>Some bookings (e.g., limited offers or last-minute deals) may be non-refundable.</li>
                </ul>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">4.1. General Policy</h3>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>StoriesByFoot functions as a travel platform and intermediary between travelers and verified third-party service providers (such as hotels, tour operators, and transport partners).</li>
                    <li>Each service provider has its own cancellation, amendment, and refund rules, which are binding on the user once a booking is confirmed. This policy applies to all bookings made directly through our Website or via official StoriesByFoot representatives.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">4.2. Cancellations by the Traveler</h3>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>Cancellations must be made in writing by emailing <a href="mailto:storiesbyfoot@gmail.com" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">storiesbyfoot@gmail.com</a> with your booking details.</li>
                    <li>Cancellations are subject to the specific policy of the Vendor (hotel, tour operator, etc.) handling your booking.</li>
                    <li>Some bookings—such as last-minute deals, seasonal offers, or non-refundable packages—may not be eligible for cancellation or refund.</li>
                    <li>Refunds, if applicable, will exclude service or convenience fees charged.</li>
                    <li>Refund requests will be processed only after confirmation from the respective Vendor.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">4.3. Cancellations by StoriesByFoot or Vendor</h3>
                  <p className="leading-relaxed mb-2">StoriesByFoot or the Vendor reserves the right to cancel a booking in cases of:</p>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>Fraud, payment failure, or technical errors</li>
                    <li>Inaccurate or incomplete traveler details</li>
                    <li>Force majeure events (natural disasters, strikes, political unrest, or pandemics)</li>
                  </ul>
                  <p className="leading-relaxed mt-3 mb-2">In such cases, you will be offered:</p>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>A refund (subject to and dependent on the Vendor's refund policy), or</li>
                    <li>The option to reschedule or receive a travel credit, depending on availability and Vendor policy.</li>
                  </ul>
                  <p className="leading-relaxed mt-3">StoriesByFoot will not be responsible for any indirect losses (such as flight costs, visa fees, or other expenses) arising from cancellations beyond our control.</p>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">4.4. Amendments and Rescheduling</h3>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>Changes to booking dates, names, or destinations are treated as amendments.</li>
                    <li>All amendments are subject to availability, Vendor approval, and additional charges.</li>
                    <li>Rescheduling within 7 days of the travel date may incur a higher fee or may not be possible, depending on the Vendor's policy.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">4.5. Refund Process</h3>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>Approved refunds will be processed to the original payment method used during booking.</li>
                    <li>Refunds are generally processed within 7–14 business days, depending on the Vendor and payment gateway timelines.</li>
                    <li>Refunds may be delayed due to bank holidays, technical issues, or incomplete information.</li>
                    <li>StoriesByFoot will provide you with email confirmation once the refund has been initiated.</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">4.6. Non-Refundable Circumstances</h3>
                  <p className="leading-relaxed mb-2">Refunds will not be provided in the following cases:</p>
                  <ul className="space-y-2 list-disc list-outside pl-6">
                    <li>"No-show" or failure to arrive on time for a tour or activity</li>
                    <li>Incomplete travel documents (passport, visa, permits, etc.)</li>
                    <li>Denied boarding or refusal of entry by authorities</li>
                    <li>Personal emergencies, illness, or medical cancellations (unless covered by insurance)</li>
                    <li>Weather disruptions or force majeure events</li>
                    <li>Services already utilized in part or full</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2">4.7. Force Majeure</h3>
                  <p className="leading-relaxed">In the event of unforeseen circumstances such as natural disasters, pandemics, war, or government restrictions, StoriesByFoot and its Vendors will make reasonable efforts to provide rescheduling or travel credits. However, cash refunds may not be possible in such cases, depending on Vendor agreements.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">5. User Responsibilities</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>You agree to provide accurate, current, and complete information when creating an account or making a booking.</li>
                <li>You are responsible for maintaining the confidentiality of your account and login credentials.</li>
                <li>You agree not to misuse our Website for illegal, fraudulent, or misleading activities; uploading harmful code, malware, or spam; or copying, scraping, or redistributing Website content without authorization.</li>
                <li>StoriesByFoot reserves the right to suspend or terminate accounts found violating these Terms or engaging in misuse.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">6. Travel Documents and Compliance</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>You are solely responsible for obtaining and carrying valid travel documents, such as passports, visas, identification, and insurance.</li>
                <li>StoriesByFoot is not responsible for losses caused by denied travel or entry due to missing or invalid documents.</li>
                <li>You must comply with all applicable local laws, customs regulations, and travel advisories of your destination.</li>
                <li>Certain experiences may require good physical fitness. You are responsible for ensuring your health condition is suitable for participation.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">7. Third-Party Services</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>StoriesByFoot may include links, offers, or bookings from third-party providers such as airlines, hotels, and tour operators.</li>
                <li>We act only as an intermediary and are not responsible for the quality, safety, reliability, or performance of these third-party services.</li>
                <li>Each booking is governed by the respective Vendor's Terms and Conditions. Please review them carefully before proceeding.</li>
                <li>Any issues, delays, or service failures should be reported directly to the Vendor. StoriesByFoot will provide assistance but does not assume liability.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">8. Travel Insurance</h2>
              <p className="text-slate-700 leading-relaxed">
                We strongly recommend that you purchase comprehensive travel insurance covering trip cancellations, medical emergencies, lost baggage, and other travel-related risks.
                StoriesByFoot does not provide or sell insurance products directly.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">9. Intellectual Property</h2>
              <ul className="space-y-2 text-slate-700 leading-relaxed list-disc list-outside pl-6">
                <li>All content on this Website including text, images, graphics, videos, logos, and software is the exclusive property of StoriesByFoot or its content partners and is protected under applicable copyright and trademark laws.</li>
                <li>You may not reproduce, distribute, modify, or republish any content without prior written consent from StoriesByFoot.</li>
                <li>Unauthorized use of our intellectual property may result in legal action.</li>
                <li>User-generated content (such as reviews, images, or stories) submitted to the platform grants StoriesByFoot a non-exclusive, royalty-free license to use such content for promotional or editorial purposes.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">10. Limitation of Liability</h2>
              <div className="space-y-3 text-slate-700">
                <div>
                  <h3 className="font-semibold mb-1">10.1. Accuracy of Information</h3>
                  <p className="leading-relaxed">StoriesByFoot strives to provide accurate information but does not guarantee the completeness, accuracy, or reliability of all content.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">10.2. We are not liable for:</h3>
                  <ul className="space-y-1 list-disc list-outside pl-6 ml-4 text-slate-700">
                    <li>Delays, cancellations, or losses arising from third-party services;</li>
                    <li>Force majeure events (e.g., natural disasters, government restrictions, strikes, pandemics);</li>
                    <li>Any direct, indirect, or consequential losses including data loss, emotional distress, or financial damages;</li>
                    <li>In no case shall our total liability exceed the total amount paid by you for the booking in question.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">10.3. Health, Safety, and Medical Conditions</h3>
                  <p className="leading-relaxed mb-2">Travel and adventure activities involve inherent risks, including but not limited to illness, injury, accidents, or other health-related issues.</p>
                  <p className="leading-relaxed mb-2">By participating in any travel experience or using the services listed on StoriesByFoot, you acknowledge and accept these risks.</p>
                  <p className="leading-relaxed mb-2">StoriesByFoot is not responsible for any injury, illness, loss of property, or anything that may occur during travel, tours, or activities arranged through third-party providers.</p>
                  <p className="leading-relaxed mb-2">All travelers are strongly advised to obtain medical and travel insurance that covers health emergencies, evacuation, and trip cancellation.</p>
                  <p className="leading-relaxed">StoriesByFoot strives to ensure accuracy of content but does not warrant that descriptions, photos, or information on the Website are free of errors or omissions.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">11. Force Majeure</h2>
              <p className="text-slate-700 leading-relaxed">
                StoriesByFoot and its partners shall not be liable for any delay or failure to perform obligations due to causes beyond reasonable control — including, but not limited to, natural disasters, war, pandemics, political unrest, or governmental actions.
                Refunds or credits in such cases will be subject to the Vendor's policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">12. Indemnification</h2>
              <p className="text-slate-700 leading-relaxed mb-2">You agree to indemnify and hold harmless StoriesByFoot, its founders, employees, and affiliates from any claims, damages, liabilities, or expenses (including legal fees) arising from your:</p>
              <ul className="space-y-2 list-disc list-outside pl-6 text-slate-700">
                <li>Violation of these Terms;</li>
                <li>Misuse of the Website;</li>
                <li>Infringement of third-party rights; or</li>
                <li>Actions causing loss or damage to other users or partners.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">13. Privacy Policy</h2>
              <p className="text-slate-700 leading-relaxed">
                Your privacy is important to us. The collection, storage, and use of your personal information are governed by our Privacy Policy, which is incorporated into these Terms by reference.
                By using this Website, you consent to our data practices as described in that policy.
                The complete Privacy Policy is published on our Website and shall be deemed an integral and binding part of these Terms and Conditions. By using this Website, you acknowledge that you have read and agreed to the complete Privacy Policy and consent to the data practices described therein.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">14. Cookie Policy</h2>
              <p className="text-slate-700 leading-relaxed">
                Our Website uses cookies and similar technologies to enhance your browsing experience, analyze website performance, and deliver personalized content. These cookies help us understand user preferences and improve our Services.
                The complete Cookie Policy is published on our Website and shall be deemed an integral and binding part of these Terms and Conditions.
                By using this Website, you acknowledge that you have read and agreed to the complete Cookie Policy and consent to the use of cookies and related technologies as described therein.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">15. Changes to Terms</h2>
              <p className="text-slate-700 leading-relaxed">
                We may revise these Terms at any time without prior notice. The updated Terms will be effective immediately upon posting on this page.
                Your continued use of the Website after such updates constitutes your acceptance of the revised Terms.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">16. Termination</h2>
              <p className="text-slate-700 leading-relaxed">
                We reserve the right to suspend or terminate your access to the Website at our discretion, without prior notice, if we believe you have violated these Terms or engaged in misconduct.
                Any outstanding obligations or pending payments will survive termination.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">17. Governing Law and Jurisdiction</h2>
              <p className="text-slate-700 leading-relaxed mb-2">
                These Terms shall be governed by and construed in accordance with the laws of India.
                Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.
              </p>
              <h3 className="font-semibold text-slate-800 mt-4">17A. Severability</h3>
              <p className="text-slate-700 leading-relaxed">
                If any provision of these Terms is held to be invalid or unenforceable under applicable law, the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">18. Entire Agreement</h2>
              <p className="text-slate-700 leading-relaxed">
                These Terms and Conditions, along with our Privacy Policy and Cancellation & Refund Policy, constitute the entire agreement between you and StoriesByFoot with respect to the Website and Services, superseding all prior communications, understandings, or agreements (whether oral or written).
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-800">19. Contact Information</h2>
              <div className="text-slate-700 leading-relaxed space-y-2">
                <p>📧 Email: <a href="mailto:contact@storiesbyfoot.com" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">contact@storiesbyfoot.com</a>, <a href="mailto:storiesbyfoot@gmail.com" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">storiesbyfoot@gmail.com</a></p>
                <p>🌐 Website: <a href="https://storiesbyfoot.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">https://storiesbyfoot.com</a></p>
                <p>📍 Registered Office: 91, GK Crystal Home, KL Highway, SAS Nagar, Punjab - 140307</p>
                <p>📞 Customer Support: <a href="tel:+916205129118" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">+916205129118</a>, <a href="tel:+916283620764" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">+916283620764</a></p>
              </div>
            </section>

            <section className="space-y-4 pt-8 border-t border-slate-200">
              <h2 className="text-2xl font-semibold text-slate-800">Disclaimer</h2>
              <p className="text-slate-700 leading-relaxed mb-2">
                All travel experiences, photos, and reviews featured on StoriesByFoot are for informational and inspirational purposes only.
                Actual experiences may vary due to weather conditions, local regulations, or third-party operations.
                StoriesByFoot does not guarantee any specific outcome, availability, or satisfaction level for services provided by third parties.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
