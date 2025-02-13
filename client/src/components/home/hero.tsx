import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const ParticleAnimation = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-white/30 rounded-full shadow-glow"
          style={{
            boxShadow: '0 0 15px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.2)'
          }}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0.5,
          }}
          animate={{
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            scale: [0.5, 1.2, 0.5],
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

const NetworkGrid = () => {
  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" style={{ opacity: 0.2 }}>
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path 
              d="M 20 0 L 0 0 0 20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              className="animate-pulse"
            />
          </pattern>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path 
              d="M 100 0 L 0 0 0 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1"
              className="animate-pulse"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

const RadialGlow = () => (
  <div 
    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20"
    style={{
      background: 'radial-gradient(circle at 50% 50%, rgba(165, 215, 232, 0.2) 0%, transparent 70%)'
    }} 
  />
);

export function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 primary-gradient opacity-90" />
      <NetworkGrid />
      <ParticleAnimation />
      <RadialGlow />
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