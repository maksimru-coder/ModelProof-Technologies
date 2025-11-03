import { motion } from "framer-motion";

export default function Terms() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground font-medium">
            Last updated: July 10, 2025
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using ModelProof Technologies ("ModelProof," "we," "our," or "us") website or services, you ("you," "your," or "user") agree to be bound by these Terms of Service ("Terms") and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">2. Services</h2>
            <p className="text-muted-foreground">
              ModelProof Technologies provides AI solutions including validation, quality assurance, and intelligent automation services such as conversational AI systems. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time with or without notice. Service descriptions, pricing, and availability are subject to change.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">3. Use License and Restrictions</h2>
            
            <h3 className="text-xl font-semibold mb-3">Permitted Use</h3>
            <p className="text-muted-foreground mb-4">
              You may use our services for lawful business purposes in accordance with these Terms.
            </p>

            <h3 className="text-xl font-semibold mb-3">Prohibited Uses</h3>
            <p className="text-muted-foreground mb-4">You may not:</p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Use our services for any unlawful purpose or to solicit unlawful activity</li>
              <li>Attempt to gain unauthorized access to our systems or networks</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Use our services to transmit viruses, malware, or other harmful code</li>
              <li>Reverse engineer, decompile, or disassemble our software</li>
              <li>Use our services to compete with ModelProof or create similar services</li>
              <li>Violate any applicable local, state, national, or international law</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">4. User Accounts and Responsibilities</h2>
            <p className="text-muted-foreground mb-4">
              If you create an account with us, you are responsible for:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
              <li>Ensuring all information provided is accurate and current</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">5. Client Data and Confidentiality</h2>
            <p className="text-muted-foreground">
              You retain ownership of all data, content, and information you provide to us. You grant us a limited license to use your data solely to provide our services to you. We will maintain appropriate security measures and confidentiality of all proprietary information shared with us.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, features, and functionality of our services, including but not limited to text, graphics, logos, software, the ModelProof Framework™, AI models, and methodologies, are the exclusive property of ModelProof Technologies and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">7. Payment Terms</h2>
            <p className="text-muted-foreground">
              Service fees are as specified in your service agreement. All fees are non-refundable unless otherwise specified. Invoices are due within 30 days of receipt. We reserve the right to suspend services for non-payment.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">8. Warranties and Disclaimers</h2>
            <p className="text-muted-foreground">
              We will provide services with reasonable skill and care. However, EXCEPT AS EXPRESSLY SET FORTH IN A SEPARATE SERVICE AGREEMENT, OUR SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, ModelProof Technologies' total liability shall not exceed the amount paid by you for services in the 12 months preceding any claim. ModelProof Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, loss of profits, revenue, data, or business interruption resulting from your use of our services.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless ModelProof Technologies from any claims, damages, losses, or expenses arising from your use of our services, violation of these Terms, or violation of any third-party rights.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your access immediately for violation of these Terms, non-payment, or at our sole discretion with 30 days' notice. Upon termination, your right to use our services ceases immediately, and outstanding fees become due.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">12. Privacy</h2>
            <p className="text-muted-foreground">
              Your privacy is governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">13. Modifications</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use constitutes acceptance of modified Terms.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">14. Governing Law and Disputes</h2>
            <p className="text-muted-foreground">
              These Terms are governed by California law. Any disputes shall be resolved through binding arbitration in San Francisco, California, under American Arbitration Association rules. You waive any right to participate in class action lawsuits.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">15. Force Majeure</h2>
            <p className="text-muted-foreground">
              We shall not be liable for any failure in performance due to circumstances beyond our reasonable control, including acts of God, natural disasters, war, terrorism, or government actions.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">16. Severability and Entire Agreement</h2>
            <p className="text-muted-foreground">
              If any provision is found unenforceable, the remaining provisions remain in effect. These Terms, along with our Privacy Policy and service agreements, constitute the entire agreement between parties.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-muted-foreground">
              Questions about these Terms of Service should be sent to us at{" "}
              <a
                href="mailto:contact@modelproof.ai"
                className="text-primary hover:underline"
              >
                contact@modelproof.ai
              </a>
              .
            </p>
          </section>

          <hr className="my-8 border-border" />

          <p className="text-sm text-muted-foreground italic text-center">
            These Terms of Service are effective as of the date listed above and apply to all use of ModelProof Technologies services.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
