import { motion } from "framer-motion";
import { 
  BarChart4, 
  Clock, 
  HeartHandshake,
  Target,
  Shield
} from "lucide-react";

export default function RetainerServices() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Retainer Services</h1>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            Retainer Services provide ongoing, proactive AI quality assurance and validation for your organization using all aspects of the ModelProof Framework™, with a specific focus on Phase 4: Monitoring.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Regular Reports</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <BarChart4 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Monthly Performance Reports</li>
                    <li>Quality Trend Analysis</li>
                    <li>Issue Resolution Logs</li>
                    <li>Improvement Recommendations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Support Package</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <HeartHandshake className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Priority Support SLA</li>
                    <li>Monthly Review Meetings</li>
                    <li>Advisory Sessions</li>
                    <li>Emergency Response</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Success Metrics</h2>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Quality Improvement %</li>
                <li>Performance Enhancement</li>
                <li>Reduced Downtime</li>
                <li>Faster Issue Resolution</li>
                <li>Customer Satisfaction</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Ideal For</h2>
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Organizations with a continuous AI development cycle</li>
                <li>Teams seeking ongoing quality control, especially for AI solutions in live production</li>
                <li>Companies that value a long-term partnership with a QA expert</li>
              </ul>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
