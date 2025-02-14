import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Careers() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Careers at ModelProof</h1>
        <p className="text-lg text-muted-foreground">
          Join us in shaping the future of AI quality assurance
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why Join ModelProof?</h2>
          <p className="text-muted-foreground mb-6">
            At ModelProof, we're on a mission to ensure AI systems are reliable,
            ethical, and effective. We offer a dynamic work environment where you
            can make a real impact on the future of AI technology.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                Work with cutting-edge AI technologies and methodologies
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                Flexible work arrangements and competitive benefits
              </span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span className="text-muted-foreground">
                Opportunities for professional growth and development
              </span>
            </li>
          </ul>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Open Positions</h2>
          <p className="text-muted-foreground">
            We're always looking for talented individuals to join our team. If you
            don't see a position that matches your skills, feel free to send us
            your resume for future opportunities.
          </p>
        </div>

        <div className="text-center">
          <Button size="lg" className="gap-2">
            <Mail className="h-4 w-4" />
            Contact Our Recruiting Team
          </Button>
        </div>
      </div>
    </div>
  );
}
