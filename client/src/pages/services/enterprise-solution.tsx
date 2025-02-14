import { motion } from "framer-motion";
import { 
  Settings, 
  LineChart, 
  FileStack,
  Target,
  Shield,
  MonitorCheck
} from "lucide-react";

export default function EnterpriseSolution() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Enterprise Solution</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Duration: 8-12 weeks (or longer, depending on complexity)
        </p>

        <div className="prose prose-slate max-w-none">
          <p className="text-muted-foreground text-lg mb-8">
            The Enterprise Solution provides a custom, end-to-end AI validation service for large-scale, complex AI projects. It uses all phases of the ModelProof Framework™: Phase 1: Assessment, Phase 2: Validation, Phase 3: Optimization, and Phase 4: Monitoring.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Custom Solutions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Testing Framework</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Custom Testing Framework</li>
                    <li>Automated Test Suites</li>
                    <li>Quality Monitoring Tools</li>
                    <li>Real-time Dashboards</li>
                    <li>Integration Guides</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <FileStack className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Strategic Documents</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Quality Strategy Plan</li>
                    <li>Risk Management Framework</li>
                    <li>Compliance Documentation</li>
                    <li>Best Practices Guide</li>
                    <li>Training Programs</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Monitoring & Analytics</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Continuous Monitoring</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Performance Metrics</li>
                    <li>Alert Systems</li>
                    <li>Regular Reporting</li>
                    <li>Trend Analysis</li>
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
                <li>Performance Enhancement</li>
                <li>Cost Savings</li>
                <li>Risk Reduction</li>
                <li>Time to Market</li>
                <li>Adherence to Regulatory Compliance</li>
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
                <li>Large-scale AI deployments with complex architectures</li>
                <li>Projects requiring continuous quality assurance and compliance monitoring</li>
                <li>Organizations that need a strategic partner for long-term AI success</li>
              </ul>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
