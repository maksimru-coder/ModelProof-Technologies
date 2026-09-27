import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Search,
  ClipboardList,
  RefreshCw,
  Eye,
  AlertTriangle,
  EyeOff,
  Star,
  Globe,
  Phone,
  Sparkles,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold tracking-[0.14em] uppercase text-primary mb-3">
      {children}
    </p>
  );
}

function ChatMock() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border overflow-hidden max-w-md mx-auto lg:ml-auto" aria-hidden="true">
      <div className="bg-primary text-white px-5 py-3.5 font-semibold text-sm flex items-center gap-2.5">
        <span className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/60" />
          <span className="w-2 h-2 rounded-full bg-white/60" />
          <span className="w-2 h-2 rounded-full bg-white/60" />
        </span>
        ChatGPT
      </div>
      <div className="p-5 flex flex-col gap-3.5">
        <div className="rounded-2xl px-4 py-3 text-sm max-w-[88%] bg-primary/10 self-end">
          Who's the best coffee shop near me?
        </div>
        <div className="rounded-2xl px-4 py-3 text-sm max-w-[88%] bg-muted self-start border">
          Based on reviews and reputation, I'd recommend{" "}
          <span className="text-primary font-semibold">Blue Door Coffee</span> and{" "}
          <span className="text-primary font-semibold">Morning Ritual</span>…
        </div>
        <div className="rounded-2xl px-4 py-3 text-sm max-w-[88%] bg-primary/10 self-end">
          What about Riverside Coffee Roasters?
        </div>
        <div className="rounded-2xl px-4 py-3 text-sm max-w-[88%] bg-muted self-start border">
          <span className="text-amber-700 font-semibold">I don't have enough information</span>{" "}
          about that business to recommend it.
        </div>
      </div>
      <div className="px-5 py-3 border-t text-xs text-muted-foreground flex justify-between">
        <span className="text-primary font-bold">● Live test</span>
        <span>ChatGPT · Claude · Gemini</span>
      </div>
    </div>
  );
}

const problems = [
  {
    icon: <EyeOff className="h-6 w-6 text-primary" />,
    title: "You might be invisible",
    text: "The AI recommends competitors and never mentions you.",
  },
  {
    icon: <AlertTriangle className="h-6 w-6 text-primary" />,
    title: "You might be misrepresented",
    text: "Outdated hours, wrong services, stale reviews — stated confidently.",
  },
  {
    icon: <Eye className="h-6 w-6 text-primary" />,
    title: "You'd never know",
    text: "No search console for AI answers. You just quietly lose business.",
  },
];

const steps = [
  {
    num: "1",
    icon: <Search className="h-6 w-6 text-white" />,
    name: "Free mini-scan",
    price: "Free",
    text: "Five real customer-style prompts run through ChatGPT, Claude, and Gemini. Full answer transcripts plus our honest read: where you're mentioned, where you're missing.",
  },
  {
    num: "2",
    icon: <ClipboardList className="h-6 w-6 text-white" />,
    name: "AI Visibility Audit",
    price: "$750 one-time",
    text: "The full diagnosis: dozens of prompts across all three models — reviews, website, Google Business Profile, competitors. Evidence-backed report with a prioritized fix list.",
  },
  {
    num: "3",
    icon: <RefreshCw className="h-6 w-6 text-white" />,
    name: "Visibility retainer",
    price: "$600 / month",
    text: "AI answers change constantly. We re-test monthly, track whether you're gaining or losing ground, and keep fixing. Plain-English report every month.",
  },
];

const services = [
  {
    icon: <Search className="h-5 w-5 text-primary" />,
    name: "AI Visibility Audit",
    text: "Full diagnostic across three AI models with an evidence-backed, prioritized fix list.",
    price: "$750",
    per: "one-time",
    featured: false,
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-primary" />,
    name: "Visibility Retainer",
    text: "Monthly re-testing, trend tracking, ongoing fixes, plain-English report.",
    price: "$600",
    per: "/ month",
    featured: false,
  },
  {
    icon: <Star className="h-5 w-5 text-primary" />,
    name: "Review Management",
    text: "Monitor, respond, and build a steady stream of fresh reviews — one of the strongest signals AI reads.",
    price: "$300",
    per: "/ month",
    featured: false,
  },
  {
    icon: <Globe className="h-5 w-5 text-primary" />,
    name: "Websites",
    text: "Your site is one of the first places AI looks. If it's thin or outdated, the models fill in the gaps — usually wrong.",
    price: "$2,500 – $5,000",
    per: "or $199/mo, no upfront",
    featured: false,
  },
  {
    icon: <Phone className="h-5 w-5 text-primary" />,
    name: "AI Front Desk",
    text: "Answers calls and messages, books appointments, answers common questions — trained on your business, tested before it touches a customer.",
    price: "$1,500 + $250",
    per: "/ mo · locked 12 months",
    featured: true,
    flag: "Founding rate",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-primary" />,
    name: "Start with the scan",
    text: "Not sure where you stand? The free mini-scan shows you — before you spend anything.",
    price: "Free",
    per: "",
    featured: false,
  },
];

const whyItems = [
  {
    n: "1",
    title: "We measure, not guess",
    text: "Every claim comes with a transcript. If we can't show it, we don't say it.",
  },
  {
    n: "2",
    title: "We show our work",
    text: "You see the raw AI answers, not just our summary. The evidence is yours to keep.",
  },
  {
    n: "3",
    title: "We don't sell guarantees",
    text: "Anyone promising “we'll make ChatGPT recommend you” is selling what they can't deliver. We sell better odds, honestly measured.",
  },
];

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-xs font-bold tracking-[0.12em] uppercase text-primary bg-primary/10 px-3.5 py-1.5 rounded-full mb-5">
              AI visibility for local businesses
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] mb-5">
              What does <span className="text-primary">AI</span> say about your business?
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-8">
              Your next customer isn't Googling you — they're asking ChatGPT, Claude, or Gemini who to trust. We test exactly what those models say about you, show you the evidence, and fix what we find.
            </p>
            <div className="flex flex-wrap gap-3.5 mb-4">
              <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                <Button size="lg" className="font-bold">
                  Get your free AI visibility mini-scan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#how">
                <Button size="lg" variant="outline" className="font-bold">
                  See how it works
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">Free. No commitment. Five minutes of your time — we do the rest.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <ChatMock />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <div className="border-y bg-background">
        <div className="container grid grid-cols-1 md:grid-cols-3 text-center py-8 gap-6">
          <div>
            <div className="text-3xl font-extrabold text-primary">3</div>
            <div className="text-sm text-muted-foreground font-medium">AI models tested on every scan</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-primary">5-prompt</div>
            <div className="text-sm text-muted-foreground font-medium">Free mini-scan, full transcripts</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-primary">20+</div>
            <div className="text-sm text-muted-foreground font-medium">Years of QA testing discipline</div>
          </div>
        </div>
      </div>

      {/* The shift */}
      <section id="problem" className="py-20">
        <div className="container">
          <Reveal>
            <Kicker>The shift</Kicker>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">The recommendation changed hands.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-12">
              For twenty years the question was “does Google show you?” Now it's “does AI recommend you?” — and there's a problem you can't see:
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="bg-card border rounded-2xl p-7 h-full shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">{p.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-muted-foreground text-sm">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-muted/40">
        <div className="container">
          <Reveal>
            <Kicker>How it works</Kicker>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Three steps. Stop after any of them.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-12">Start free. Every paid step is backed by evidence you can see.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.1}>
                <div className="bg-card border rounded-2xl p-8 h-full relative shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                  <span className="absolute top-5 right-6 text-5xl font-extrabold text-primary/10 leading-none">{s.num}</span>
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">{s.icon}</div>
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <div className="text-sm font-bold text-primary mb-2.5">{s.price}</div>
                  <p className="text-muted-foreground text-sm">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-7 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-sm text-amber-900 max-w-4xl">
              <strong className="text-foreground">An honest note:</strong> nobody can guarantee an AI will recommend you — not us, not anyone. What we sell is better odds: accurate information everywhere the models look, stronger signals than your competitors, and measurement so you know it's working instead of hoping.
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="container">
          <Reveal>
            <Kicker>Services</Kicker>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Everything that makes AI choose you.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-12">Visibility is the core. These are the levers that move it.</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <Reveal key={s.name} delay={(i % 3) * 0.1}>
                <div className={`bg-card rounded-2xl p-6 h-full flex flex-col shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all ${s.featured ? "border-2 border-primary relative" : "border"}`}>
                  {s.flag && (
                    <span className="absolute -top-3 left-6 bg-primary text-white text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                      {s.flag}
                    </span>
                  )}
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3.5">{s.icon}</div>
                  <h3 className="font-bold mb-1">{s.name}</h3>
                  <p className="text-muted-foreground text-sm flex-1">{s.text}</p>
                  <div className="mt-3.5 font-extrabold text-lg">
                    {s.price} {s.per && <small className="font-medium text-muted-foreground text-xs">{s.per}</small>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="mt-7 text-center text-muted-foreground text-sm">
              Also available: social media management from $500/mo and Google Business Profile overhauls ($500).{" "}
              <Link href="/contact" onClick={() => window.scrollTo(0, 0)} className="text-primary font-bold hover:underline">
                Ask us
              </Link>{" "}
              what's right for your business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="py-20 bg-muted/40">
        <div className="container">
          <Reveal>
            <Kicker>Why ModelProof</Kicker>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">We're testers by trade.</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-12">
              Twenty years of breaking software for a living — proving what's actually true versus what someone claims. We brought that discipline to AI.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {whyItems.map((w, i) => (
              <Reveal key={w.n} delay={i * 0.1}>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-extrabold flex items-center justify-center">
                    {w.n}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{w.title}</h3>
                    <p className="text-muted-foreground text-sm">{w.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20">
        <div className="container">
          <Reveal>
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 md:p-14 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Find out what AI says about you.</h2>
              <p className="text-white/80 text-lg mb-8">Free mini-scan. Full transcripts. No commitment.</p>
              <Link href="/contact" onClick={() => window.scrollTo(0, 0)}>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10">
                  Get your free mini-scan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Email strip */}
      <section className="pb-20">
        <div className="container flex items-center justify-center gap-3 text-sm text-muted-foreground">
          <MessageSquare className="h-4 w-4 text-primary" />
          Prefer email? Reach us at maksim@modelproof.ai — we reply within one business day.
        </div>
      </section>
    </div>
  );
}
