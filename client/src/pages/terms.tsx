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
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using ModelProof Technologies' services, you
              agree to be bound by these Terms of Service and all applicable laws
              and regulations. If you do not agree with any of these terms, you
              are prohibited from using or accessing our services.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">2. Services</h2>
            <p className="text-muted-foreground">
              ModelProof Technologies provides AI quality assurance and
              validation services. We reserve the right to modify, suspend, or
              discontinue any aspect of our services at any time.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">3. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, features, and functionality of our services, including
              but not limited to text, graphics, logos, and software, are the
              exclusive property of ModelProof Technologies and are protected
              by copyright and other intellectual property laws.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">4. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              ModelProof Technologies shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages resulting
              from your use of our services.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-muted-foreground">
              Questions about the Terms of Service should be sent to us at{" "}
              <a
                href="mailto:contact@modelproof.ai"
                className="text-primary hover:underline"
              >
                contact@modelproof.ai
              </a>
              .
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
