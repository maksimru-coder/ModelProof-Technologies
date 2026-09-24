import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const NetworkGrid = () => {
  return (
    <div className="absolute inset-0">
      <svg className="w-full h-full" style={{ opacity: 0.1 }}>
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white" />
          </pattern>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export function Hero() {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden pb-16 md:pb-20 pt-8 md:pt-16">
      <div className="absolute inset-0 bg-primary" />
      <NetworkGrid />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-4xl text-center">
          <p className="mb-6 text-sm font-medium tracking-wide text-cyan-300 uppercase">AI visibility for businesses nationwide</p>
          <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 text-white" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            Find out if ChatGPT recommends you — or your competitor.
          </motion.h1>
          <motion.p className="mt-8 text-xl md:text-2xl leading-relaxed text-white/80" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            People ask ChatGPT, Claude, and Gemini who to trust. We run those questions against your business, send you the answers, and tell you what is actually wrong.
          </motion.p>
          <motion.div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
            <Link href="/contact">
              <Button size="lg" onClick={() => window.scrollTo(0, 0)} className="px-8 py-4 font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-primary hover:from-emerald-300 hover:to-cyan-300 rounded-lg transform transition-all hover:-translate-y-1 hover:shadow-2xl shadow-lg shadow-emerald-400/30 border-2 border-white/30 hover:border-white/50" data-testid="button-free-scan">
                Get your free mini-scan
              </Button>
            </Link>
            <Link href="/methodology">
              <Button size="lg" onClick={() => window.scrollTo(0, 0)} className="px-6 py-3 font-semibold bg-white text-primary hover:bg-white/90 rounded-lg transform transition-all hover:-translate-y-0.5 hover:shadow-lg border-2 border-white/20 hover:border-white/40" data-testid="button-how-it-works">
                See how a scan works
              </Button>
            </Link>
          </motion.div>
          <p className="mt-6 text-sm text-white/70">Free. 24–48 hours. Anywhere in the U.S. No sales call required to get the results.</p>
        </motion.div>
      </div>
    </div>
  );
}
