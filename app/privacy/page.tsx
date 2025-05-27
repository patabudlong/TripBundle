export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              TripBundle - Your Complete Travel Companion
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                At TripBundle, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our all-in-one travel booking platform, including our website, mobile application, and related services (collectively, the "Service").
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                By using TripBundle, you consent to the data practices described in this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">2.1 Personal Information</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    We collect personal information that you voluntarily provide to us, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Name, email address, and phone number</li>
                    <li>Date of birth and gender</li>
                    <li>Passport and travel document information</li>
                    <li>Payment information (credit card details, billing address)</li>
                    <li>Travel preferences and dietary restrictions</li>
                    <li>Emergency contact information</li>
                    <li>Profile photos and user-generated content</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">2.2 Booking Information</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    When you make bookings through TripBundle, we collect:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Travel dates and destinations</li>
                    <li>Accommodation preferences and special requests</li>
                    <li>Car rental details and driver information</li>
                    <li>Tour and activity selections</li>
                    <li>Restaurant reservations and food preferences</li>
                    <li>Guest information for group bookings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">2.3 Automatically Collected Information</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    We automatically collect certain information when you use our Service:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Usage data (pages visited, time spent, click patterns)</li>
                    <li>Location data (with your permission)</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Log files and analytics data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">2.4 Third-Party Information</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We may receive information about you from third parties, including social media platforms (when you connect your accounts), payment processors, travel service providers, and marketing partners.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. How We Use Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use the information we collect for the following purposes:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">3.1 Service Provision</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Process and manage your bookings</li>
                    <li>Facilitate payments and transactions</li>
                    <li>Provide customer support and assistance</li>
                    <li>Send booking confirmations and travel updates</li>
                    <li>Connect you with travel service providers</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">3.2 Personalization and Improvement</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Personalize your travel recommendations</li>
                    <li>Improve our platform and user experience</li>
                    <li>Analyze usage patterns and preferences</li>
                    <li>Develop new features and services</li>
                    <li>Conduct research and analytics</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">3.3 Communication and Marketing</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Send promotional offers and travel deals</li>
                    <li>Provide travel tips and destination information</li>
                    <li>Send newsletters and updates (with your consent)</li>
                    <li>Respond to your inquiries and feedback</li>
                    <li>Conduct surveys and market research</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">3.4 Legal and Security</h3>
                  <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Comply with legal obligations and regulations</li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Enforce our Terms of Service</li>
                    <li>Protect our rights and interests</li>
                    <li>Respond to legal requests and court orders</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. How We Share Your Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may share your information in the following circumstances:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">4.1 Travel Service Providers</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We share necessary booking information with hotels, airlines, car rental companies, tour operators, restaurants, and other travel service providers to fulfill your reservations.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">4.2 Payment Processors</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We share payment information with secure third-party payment processors to handle transactions and prevent fraud.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">4.3 Service Providers</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We may share information with trusted third-party service providers who assist us in operating our platform, including cloud hosting, analytics, customer support, and marketing services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">4.4 Legal Requirements</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We may disclose your information when required by law, court order, or government request, or to protect our rights, property, or safety.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">4.5 Business Transfers</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Data Security
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure data storage with encryption at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and employee training</li>
                <li>Secure payment processing through PCI-compliant providers</li>
                <li>Regular backup and disaster recovery procedures</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use cookies, web beacons, and similar tracking technologies to enhance your experience on our platform. These technologies help us:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and recommendations</li>
                <li>Measure the effectiveness of our marketing campaigns</li>
                <li>Prevent fraud and improve security</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                You can control cookie settings through your browser preferences. However, disabling cookies may limit some functionality of our Service.
              </p>
            </section>

            {/* Your Rights and Choices */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Your Rights and Choices
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">7.1 Access and Portability</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You can request access to your personal information and receive a copy in a portable format.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">7.2 Correction and Updates</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You can update or correct your personal information through your account settings or by contacting us.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">7.3 Deletion</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You can request deletion of your personal information, subject to certain legal and business requirements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">7.4 Marketing Communications</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You can opt out of marketing communications by using the unsubscribe link in emails or updating your preferences in your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">7.5 Location Data</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    You can control location sharing through your device settings or app permissions.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Data Retention
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this Privacy Policy. Specific retention periods include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Account information: Until you delete your account or request deletion</li>
                <li>Booking records: 7 years for tax and legal compliance</li>
                <li>Payment information: As required by payment processors and regulations</li>
                <li>Marketing data: Until you opt out or as required by law</li>
                <li>Analytics data: Typically 2-3 years in aggregated form</li>
              </ul>
            </section>

            {/* International Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. International Data Transfers
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TripBundle operates globally, and your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Standard contractual clauses approved by relevant authorities</li>
                <li>Adequacy decisions by regulatory bodies</li>
                <li>Certification schemes and codes of conduct</li>
                <li>Binding corporate rules for intra-group transfers</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Children's Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TripBundle is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                For users between 13 and 18 years of age, parental consent may be required for certain activities.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of significant changes by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our platform</li>
                <li>Requesting consent for material changes where required</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Your continued use of TripBundle after changes become effective constitutes acceptance of the updated Privacy Policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                12. Contact Us
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>TripBundle Inc. - Privacy Team</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Email: privacy@tripbundle.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Data Protection Officer: dpo@tripbundle.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Customer Support: support@tripbundle.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Phone: 1-800-TRIPBUNDLE (1-800-874-7286)
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Response Time: We aim to respond to privacy inquiries within 30 days
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Your Privacy Matters
                </h3>
                <p className="text-blue-800 dark:text-blue-300">
                  At TripBundle, we are committed to protecting your privacy and being transparent about our data practices. We believe that trust is fundamental to our relationship with you, and we work hard to earn and maintain that trust every day.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 