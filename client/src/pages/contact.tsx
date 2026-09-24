import { motion } from "framer-motion";
import { ContactForm } from "@/components/contact/contact-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-4">Get your free AI visibility mini-scan</h1>
        <p className="text-lg text-muted-foreground">
          Tell us who you are. We run five customer-style prompts through ChatGPT, Claude, and Gemini and send you what they say — plus a short, honest read. Results in 24–48 hours.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Request the mini-scan</CardTitle>
              <CardDescription>
                Free. No commitment. We use this to run the test — not to put you on a call sequence.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:maksim@modelproof.ai" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    maksim@modelproof.ai
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Office</p>
                  <p className="text-sm text-muted-foreground">
                    Danville, California 94526<br />United States
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">Turnaround</p>
                  <p className="text-sm text-muted-foreground">Mini-scan results within 24–48 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
