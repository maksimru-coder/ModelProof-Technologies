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
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-muted-foreground">
              ModelProof Technologies LLC ("we," "our," or "us") respects your
              privacy and is committed to protecting your personal information. This
              Privacy Policy explains how we collect, use, and safeguard your
              information when you visit our website or use our services.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Contact information (name, email, phone number)</li>
              <li>Company information</li>
              <li>Service inquiry details</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
              <li>Provide and improve our services</li>
              <li>Communicate with you about our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact
              us at{" "}
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
