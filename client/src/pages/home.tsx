import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { HowItWorks } from "@/components/home/how-it-works";
import { WhyUs } from "@/components/home/why-us";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <WhyUs />
    </>
  );
}
