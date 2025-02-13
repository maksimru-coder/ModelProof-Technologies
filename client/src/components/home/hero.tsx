import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const ParticleAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-white/20 rounded-full shadow-glow"
          style={{
            boxShadow: '0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2)'
          }}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0.5,
          }}
          animate={{
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const NetworkLines = () => {
  return (
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
      <defs>
        <pattern
          id="grid"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 30 0 L 0 0 0 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#fade)" />
    </svg>
  );
};

export function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 primary-gradient" />
      <NetworkLines />
      <ParticleAnimation />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(165, 215, 232, 0.1) 0%, transparent 50%)'
      }} />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Elevating AI Through Expert Validation
          </motion.h1>
          <motion.p
            className="mt-8 text-xl md:text-2xl leading-relaxed text-white/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Your strategic partner in ensuring AI system quality, reliability, and
            ethical compliance
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
                className="px-6 py-3 font-semibold bg-white text-[#0B2447] hover:bg-[#A5D7E8] rounded-lg transform transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                View Our Services
              </Button>
            </Link>
            <Link href="/methodology">
              <Button
                size="lg"
                className="px-6 py-3 font-semibold bg-white text-[#0B2447] hover:bg-[#A5D7E8] rounded-lg transform transition-all hover:-translate-y-0.5 hover:shadow-lg"
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