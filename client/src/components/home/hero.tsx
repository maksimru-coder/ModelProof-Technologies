import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const NetworkGrid = () => {
  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" style={{ opacity: 0.1 }}>
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path 
              d="M 20 0 L 0 0 0 20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              className="text-white"
            />
          </pattern>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path 
              d="M 100 0 L 0 0 0 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              className="text-white"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden pb-16 md:pb-20">
      <div className="absolute inset-0 bg-primary" />
      <NetworkGrid />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 text-white"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            AI You Can Trust. Results You Can Measure
          </motion.h1>
          <motion.p
            className="mt-8 text-xl md:text-2xl leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            From enterprise-grade model validation to custom AI assistants, we help companies deploy reliable, compliant, and high-performing AI systems
          </motion.p>
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link href="/services">
              <Button
                size="lg"
                className="px-6 py-3 font-semibold bg-white text-primary hover:bg-white/90 rounded-lg transform transition-all hover:-translate-y-0.5 hover:shadow-lg border-2 border-white/20 hover:border-white/40"
              >
                View Our Services
              </Button>
            </Link>
            <Link href="/methodology">
              <Button
                size="lg"
                className="px-6 py-3 font-semibold bg-white text-primary hover:bg-white/90 rounded-lg transform transition-all hover:-translate-y-0.5 hover:shadow-lg border-2 border-white/20 hover:border-white/40"
              >
                Learn Our Methodology
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}