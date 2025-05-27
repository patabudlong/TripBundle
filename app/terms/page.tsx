export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
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
                Welcome to TripBundle, an all-in-one travel booking platform that simplifies your journey by integrating everything you need in one place: travel accommodations, car rentals, hotels, tour guides, food experiences, and must-visit places. These Terms of Service ("Terms") govern your use of the TripBundle website, mobile application, and related services (collectively, the "Service") operated by TripBundle Inc. ("we," "us," or "our").
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Acceptance of Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                By creating an account, accessing, or using TripBundle, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. You must be at least 18 years old or have parental consent to use our Service.
              </p>
            </section>

            {/* Service Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Service Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TripBundle provides a comprehensive travel booking platform that allows users to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Search and book travel accommodations including hotels, vacation rentals, and hostels</li>
                <li>Reserve car rentals from various providers</li>
                <li>Book tours and experiences with local guides</li>
                <li>Discover and reserve food experiences and restaurant bookings</li>
                <li>Explore must-visit places and attractions</li>
                <li>Plan and manage complete travel itineraries</li>
                <li>Access travel recommendations and reviews</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                We act as an intermediary between you and third-party service providers. While we facilitate bookings, the actual services are provided by independent suppliers.
              </p>
            </section>

            {/* User Accounts */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. User Accounts
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To access certain features of TripBundle, you must create an account. You agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and update your account information</li>
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>
            </section>

            {/* Booking and Payments */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Booking and Payments
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">5.1 Booking Process</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    When you make a booking through TripBundle, you enter into a contract with the service provider, not with TripBundle. We facilitate the booking process but are not a party to the transaction.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">5.2 Pricing and Fees</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    All prices displayed are subject to availability and may change without notice. Additional fees, taxes, and charges may apply. TripBundle may charge service fees for certain bookings, which will be clearly disclosed before payment.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">5.3 Payment Processing</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Payments are processed securely through third-party payment processors. You authorize us to charge your selected payment method for all fees and charges incurred.
                  </p>
                </div>
              </div>
            </section>

            {/* Cancellations and Refunds */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Cancellations and Refunds
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cancellation and refund policies vary by service provider and booking type. Each booking is subject to the specific terms and conditions of the service provider. TripBundle will clearly display applicable cancellation policies before you complete your booking.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                For cancellations, please contact our customer support team or use the cancellation features in your account dashboard. Refund processing times may vary depending on the service provider and payment method.
              </p>
            </section>

            {/* User Conduct */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. User Conduct
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You agree not to use TripBundle to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the Service for commercial purposes without authorization</li>
                <li>Post inappropriate, offensive, or harmful content</li>
                <li>Harass, abuse, or harm other users</li>
              </ul>
            </section>

            {/* Reviews and Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Reviews and User Content
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You may submit reviews, photos, and other content through our Service. By submitting content, you grant TripBundle a non-exclusive, royalty-free, worldwide license to use, display, and distribute your content in connection with our Service.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                You are responsible for the accuracy and appropriateness of your content. We reserve the right to remove any content that violates these Terms or is otherwise objectionable.
              </p>
            </section>

            {/* Third-Party Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Third-Party Services
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TripBundle integrates with various third-party service providers including hotels, car rental companies, tour operators, restaurants, and attractions. We are not responsible for the quality, availability, or performance of these third-party services.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Your use of third-party services is subject to their respective terms and conditions. We encourage you to review these terms before making bookings.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Limitation of Liability
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TripBundle acts as an intermediary and is not liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4 space-y-2">
                <li>The quality, safety, or legality of services provided by third parties</li>
                <li>Cancellations, delays, or changes made by service providers</li>
                <li>Loss or damage to personal property during travel</li>
                <li>Personal injury or death resulting from third-party services</li>
                <li>Force majeure events including natural disasters, pandemics, or government actions</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Our total liability for any claims related to your use of TripBundle shall not exceed the amount you paid for the specific booking in question.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Intellectual Property
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The TripBundle platform, including its design, functionality, content, and trademarks, is owned by TripBundle Inc. and protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our written permission.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                12. Privacy
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which explains how we collect, use, and protect your personal information when you use our Service.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                13. Termination
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, if you breach these Terms. You may also terminate your account at any time by contacting our customer support.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Upon termination, your right to use the Service will cease immediately, but these Terms will remain in effect regarding any prior use of the Service.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                14. Changes to Terms
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through our platform. Your continued use of the Service after changes become effective constitutes acceptance of the new Terms.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                15. Governing Law
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                These Terms are governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles. Any disputes arising from these Terms or your use of the Service will be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                16. Contact Information
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  <strong>TripBundle Inc.</strong>
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Email: legal@tripbundle.com
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Customer Support: support@tripbundle.com
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Phone: 1-800-TRIPBUNDLE (1-800-874-7286)
                </p>
              </div>
            </section>

            {/* Acknowledgment */}
            <section className="mb-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Acknowledgment
                </h3>
                <p className="text-blue-800 dark:text-blue-300">
                  By using TripBundle, you acknowledge that you have read these Terms of Service, understand them, and agree to be bound by them. Thank you for choosing TripBundle as your complete travel companion!
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 