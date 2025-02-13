import { motion } from "framer-motion";
import { QualityScore } from "@/components/framework/quality-score";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Methodology() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Our Methodology</h1>
        <p className="text-lg text-muted-foreground">
          The ModelProof Framework™ ensures comprehensive AI validation
        </p>
      </motion.div>

      <div className="grid gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Phase 1: Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We begin with a deep dive into your AI system's architecture,
              analyzing requirements, evaluating risks, and establishing quality
              baselines.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phase 2: Validation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Rigorous testing of your AI system, including model performance,
              output quality verification, and bias detection.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phase 3: Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Focus on enhancing performance, optimizing resources, and refining
              processes for maximum efficiency.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phase 4: Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Continuous quality tracking and performance monitoring to ensure
              long-term success.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">ModelProof Quality Score™</h2>
        <QualityScore />
      </div>
    </div>
  );
}
