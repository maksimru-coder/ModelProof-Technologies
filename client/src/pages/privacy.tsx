import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground font-medium">
            Last updated: July 10, 2025
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-muted-foreground">
              ModelProof Technologies ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our AI validation and automation services.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3">Information You Provide Directly</h3>
            <p className="text-muted-foreground mb-4">
              We collect information that you voluntarily provide to us, including:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Contact information (name, email address, phone number)</li>
              <li>Company information and job title</li>
              <li>Service inquiry details and project requirements</li>
              <li>Messages and communications sent to us</li>
              <li>Account information when you use our services</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-muted-foreground mb-4">
              We automatically collect certain information when you visit our website, including:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>IP address and general location data</li>
              <li>Browser type, version, and operating system</li>
              <li>Device information and screen resolution</li>
              <li>Pages visited, time spent, and navigation patterns</li>
              <li>Referring website information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar technologies to enhance your website experience, including:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li><strong>Essential cookies</strong> for basic website functionality and security</li>
              <li><strong>Analytics cookies</strong> to understand how visitors use our website</li>
              <li><strong>Preference cookies</strong> to remember your settings and choices</li>
              <li><strong>Marketing cookies</strong> to provide relevant content and advertisements</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You can control cookie preferences through your browser settings. However, disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Provide, maintain, and improve our AI validation and automation services</li>
              <li>Communicate with you about our services and respond to inquiries</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Process service requests and manage client relationships</li>
              <li>Analyze website usage to improve user experience</li>
              <li>Comply with legal obligations and protect our rights</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">How We Share Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, rent, or trade your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li><strong>Service Providers:</strong> With trusted third-party vendors who assist in our operations (hosting, analytics, customer support)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
              <li><strong>Business Protection:</strong> To protect our rights, property, or safety, or that of our users</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
              <li><strong>With Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication procedures</li>
              <li>Secure data storage and backup systems</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
            <p className="text-muted-foreground mb-4">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Provide our services and maintain our relationship with you</li>
              <li>Comply with legal obligations and resolve disputes</li>
              <li>Enforce our agreements and protect our legitimate business interests</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              When we no longer need your information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Rights and Choices</h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your information to another service</li>
              <li><strong>Restriction:</strong> Request limitation of how we process your information</li>
              <li><strong>Objection:</strong> Object to certain types of processing</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us at contact@modelproof.ai.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">International Data Transfers</h2>
            <p className="text-muted-foreground">
              If you are located outside the United States, please note that we may transfer your information to and process it in the United States, where our servers are located and our central database is operated.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware of such collection, we will take steps to delete the information promptly.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">California Privacy Rights</h2>
            <p className="text-muted-foreground">
              California residents may have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected and how it is used, and the right to delete personal information.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Posting the updated policy on our website</li>
              <li>Updating the "Last updated" date</li>
              <li>Sending email notification for significant changes</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Your continued use of our services after any changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="text-muted-foreground">
              <p><strong>ModelProof Technologies</strong></p>
              <p>Email: <a href="mailto:contact@modelproof.ai" className="text-primary hover:underline">contact@modelproof.ai</a></p>
              <p>Address: San Francisco Bay Area, California, United States</p>
            </div>
            <p className="text-muted-foreground mt-4">
              For privacy-related inquiries, please include "Privacy Policy" in the subject line of your email.
            </p>
          </section>

          <hr className="my-8 border-border" />

          <p className="text-sm text-muted-foreground italic text-center">
            This Privacy Policy is effective as of the date listed above and applies to all information collected by ModelProof Technologies.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
