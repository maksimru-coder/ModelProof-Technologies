import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, FileText, Ban } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Eye,
    title: "We measure, not guess",
    description: "Every claim about your AI visibility comes with a screenshot or a transcript. If we can't show it, we don't say it.",
  },
  {
    icon: FileText,
    title: "We show our work",
    description: "You see the raw answers from ChatGPT, Claude, and Gemini — not just a summary. The evidence is yours to keep.",
  },
  {
    icon: Ban,
    title: "No fake guarantees",
    description: "We will not promise that an AI will recommend you. We sell better odds: accurate information, stronger signals, and monthly measurement.",
  },
  {
    icon: Shield,
    title: "Testers by trade",
    description: "Twenty years of software quality assurance. We treat AI answers the way we treat software: run the test, keep the evidence, fix what failed.",
  },
];

export default function About() {
  return (
    <div className="container py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About ModelProof</h1>
        <p className="text-lg text-muted-foreground">We make your business visible and chosen in the AI era.</p>
      </motion.div>
      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader><CardTitle>Who we are</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">ModelProof Technologies tests what large language models tell the public about local businesses — then helps those businesses correct the record. We are based in the East Bay (Danville / San Ramon, California).</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardHeader><CardTitle>How we got here</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">The company started in software quality assurance: twenty years of proving what a system actually does versus what someone claims. That same discipline is now applied to ChatGPT, Claude, and Gemini answers about your practice, shop, or firm.</p>
          </CardContent>
        </Card>
      </div>
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">What we believe</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <Card className="h-full hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <value.icon className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Link href="/contact">
          <Button onClick={() => window.scrollTo(0, 0)}>Get your free mini-scan</Button>
        </Link>
      </div>
    </div>
  );
}
