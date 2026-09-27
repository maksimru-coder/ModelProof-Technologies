import { motion } from "framer-motion";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Bot, Eye, Globe, MapPin, Share2, Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ServiceIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="w-16 h-16 mb-6 flex items-center justify-center">
    {children}
  </div>
);

const iconClass = "h-12 w-12 stroke-[1.5] text-primary";
const iconStyle = { filter: "drop-shadow(0 0 8px rgba(11, 36, 71, 0.2))" };

type ServicePoint = { lead: string; rest: string };

type SecondaryService = {
  id: string;
  icon: React.ReactNode;
  name: string;
  tagline: string;
  flag?: string;
  blurb: string;
  points: ServicePoint[];
  prices: string[];
  cta?: { href: string; label: string };
};

const secondaryServices: SecondaryService[] = [
  {
    id: "ai-front-desk",
    icon: <Bot className={iconClass} style={iconStyle} />,
    name: "AI Front Desk",
    tagline: "Never miss another call",
    flag: "Founding rate",
    blurb:
      "An AI receptionist trained on your business answers calls and messages 24/7, books appointments straight into your calendar, and handles common questions — QA-tested before it ever touches a customer.",
    points: [
      { lead: "24/7 answering", rest: "every call and message picked up, day or night" },
      { lead: "Books appointments", rest: "straight into your calendar, no phone tag" },
      { lead: "Trained on your business", rest: "services, pricing, policies, FAQs" },
      { lead: "Tested before go-live", rest: "we break it in the lab so it never breaks on a customer" },
    ],
    prices: ["$1,500 setup + $250/mo — founding rate, locked 12 months", "Standard rate: $2,500 + $400/mo"],
  },
  {
    id: "review-management",
    icon: <Star className={iconClass} style={iconStyle} />,
    name: "Review Management",
    tagline: "Turn reviews into recommendations",
    blurb:
      "Reviews are one of the strongest signals AI reads when deciding who to recommend. We monitor every review, respond professionally, and build you a steady stream of fresh five-stars.",
    points: [
      { lead: "Monitored everywhere", rest: "Google and the platforms that matter, watched daily" },
      { lead: "Every review answered", rest: "professional responses, in your voice" },
      { lead: "Steady stream of new reviews", rest: "we make asking automatic, not awkward" },
      { lead: "Monthly report", rest: "rating trend, response rate, what changed" },
    ],
    prices: ["$300/mo"],
  },
  {
    id: "websites",
    icon: <Globe className={iconClass} style={iconStyle} />,
    name: "Websites",
    tagline: "Built for customers — and for AI",
    blurb:
      "Your website is one of the first places AI looks. If it's thin or outdated, the models fill in the gaps — usually wrong. We build fast, modern sites written so both customers and AI understand exactly who you are.",
    points: [
      { lead: "Essential — $2,500", rest: "a sharp, modern site that covers the fundamentals" },
      { lead: "Premium — $5,000", rest: "custom design, richer content, built to convert" },
      { lead: "$199/mo, no upfront", rest: "website-as-a-service, 12-month term, we handle everything" },
      { lead: "Rescue — $1,000–$2,500", rest: "your current site fixed, sped up, and brought current" },
    ],
    prices: ["Essential $2,500 · Premium $5,000 · $199/mo no-upfront · Rescue $1,000–$2,500"],
  },
  {
    id: "social-media",
    icon: <Share2 className={iconClass} style={iconStyle} />,
    name: "Social Media Management",
    tagline: "Look alive everywhere customers look",
    blurb:
      "Fresh, active profiles signal a living business — to customers and to AI. We run your social presence end to end so you never have to think about it.",
    points: [
      { lead: "Content handled", rest: "posts written and designed for your business" },
      { lead: "Posted consistently", rest: "a steady cadence, no ghost-town profiles" },
      { lead: "Starter — $500/mo", rest: "one platform, done right" },
      { lead: "Growth — $800/mo", rest: "multi-platform presence with more volume" },
    ],
    prices: ["Starter $500/mo · Growth $800/mo"],
  },
  {
    id: "gbp-overhaul",
    icon: <MapPin className={iconClass} style={iconStyle} />,
    name: "Google Business Profile Overhaul",
    tagline: "Fix the #1 thing AI reads about you",
    blurb:
      "Your Google Business Profile is the first source AI models check for local businesses. We rebuild it completely — categories, services, photos, posts, Q&A — everything the models look at.",
    points: [
      { lead: "Full rebuild", rest: "categories, services, hours, attributes — all correct" },
      { lead: "Photos & posts", rest: "optimized visuals and fresh posts that signal activity" },
      { lead: "Q&A seeded", rest: "the questions customers actually ask, answered" },
      { lead: "One-time fix", rest: "done right, then maintained by your retainer or review plan" },
    ],
    prices: ["$500 one-time"],
  },
];

function Bullet({ lead, rest }: ServicePoint) {
  return (
    <li className="flex items-start space-x-3 group">
      <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
        <span className="font-medium text-foreground">{lead}:</span> {rest}
      </span>
    </li>
  );
}

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-lg text-muted-foreground">
          Everything that makes your business visible and chosen in the AI era — tested, fixed, and measured.
        </p>
      </motion.div>

      <div className="grid gap-8 mb-16">
        <Card id="ai-visibility" className="border-2 border-primary/30 relative">
          <span className="absolute -top-3 left-8 bg-primary text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
            Start here
          </span>
          <CardHeader>
            <ServiceIcon>
              <Eye className={iconClass} style={iconStyle} />
            </ServiceIcon>
            <CardTitle className="text-2xl mb-2">AI Visibility Services</CardTitle>
            <CardDescription className="text-lg font-medium text-primary/80 mb-4">
              What does AI say about your business? We test it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              Your customers are asking ChatGPT, Claude, and Gemini who to trust — instead of Googling. We run real customer-style prompts through all three models, show you the full transcripts of exactly what they say about your business, and fix what we find.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Free Mini-Scan:</span> Five real prompts across ChatGPT, Claude, and Gemini with our honest read
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">AI Visibility Audit ($750):</span> Dozens of prompts, visibility gap analysis, prioritized fix list
                </span>
              </li>
              <li className="flex items-start space-x-3 group">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 transition-all duration-200 group-hover:scale-125" />
                <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                  <span className="font-medium text-foreground">Visibility Retainer ($600/mo):</span> Monthly re-testing, trend tracking, ongoing corrective work
                </span>
              </li>
            </ul>
            <div className="flex justify-center">
              <Link href="/services/ai-visibility">
                <Button
                  className="px-8 py-2 transform hover:-translate-y-1 transition-all duration-200 hover:shadow-lg"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {secondaryServices.map((s) => (
            <Card key={s.id} id={s.id} className="relative flex flex-col">
              {s.flag && (
                <span className="absolute -top-3 left-8 bg-primary text-white text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  {s.flag}
                </span>
              )}
              <CardHeader>
                <ServiceIcon>{s.icon}</ServiceIcon>
                <CardTitle className="text-2xl mb-2">{s.name}</CardTitle>
                <CardDescription className="text-lg font-medium text-primary/80 mb-4">
                  {s.tagline}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <p className="mb-6 text-muted-foreground">{s.blurb}</p>
                <ul className="space-y-4 mb-8">
                  {s.points.map((p) => (
                    <Bullet key={p.lead} lead={p.lead} rest={p.rest} />
                  ))}
                </ul>
                <div className="mt-auto">
                  {s.prices.map((price) => (
                    <p key={price} className="text-xl font-bold text-foreground mb-1">
                      {price}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center mb-16 bg-primary/5 rounded-2xl p-10">
        <h2 className="text-2xl font-bold mb-4">Not sure where to start?</h2>
        <p className="text-muted-foreground mb-8">
          The free mini-scan shows you exactly what AI says about your business today — before you spend anything.
        </p>
        <Link href="/contact">
          <Button
            size="lg"
            className="px-10 py-5 text-lg font-bold"
            onClick={() => window.scrollTo(0, 0)}
          >
            Get Your Free Mini-Scan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
