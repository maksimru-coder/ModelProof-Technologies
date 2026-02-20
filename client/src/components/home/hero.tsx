import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Calendar } from "lucide-react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

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
    <div className="relative min-h-[85vh] flex items-center overflow-hidden pb-16 md:pb-20 pt-8 md:pt-16">
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
            We build AI automation systems and intelligent agents that help businesses capture more leads, eliminate manual work, and grow faster — typically live within 7 days, no technical team required.
          </motion.p>
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button
              size="lg"
              onClick={() => {
                if (window.Calendly) {
                  window.Calendly.initPopupWidget({ url: 'https://calendly.com/maksim-modelproof/30min' });
                }
              }}
              className="px-8 py-4 font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-primary hover:from-emerald-300 hover:to-cyan-300 rounded-lg transform transition-all hover:-translate-y-1 hover:shadow-2xl shadow-lg shadow-emerald-400/30 border-2 border-white/30 hover:border-white/50"
              data-testid="button-book-call"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Free 15-Min Call
            </Button>
            <Link href="/services">
              <Button
                size="lg"
                onClick={() => window.scrollTo(0, 0)}
                className="px-6 py-3 font-semibold bg-white text-primary hover:bg-white/90 rounded-lg transform transition-all hover:-translate-y-0.5 hover:shadow-lg border-2 border-white/20 hover:border-white/40"
                data-testid="button-view-services"
              >
                Services
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                onClick={() => window.scrollTo(0, 0)}
                className="px-6 py-3 font-semibold bg-white text-primary hover:bg-white/90 rounded-lg transform transition-all hover:-translate-y-0.5 hover:shadow-lg border-2 border-white/20 hover:border-white/40"
                data-testid="button-view-products"
              >
                Products
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}