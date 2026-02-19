import { Hero } from "@/components/home/hero";
import { ServicesOverview } from "@/components/home/services-overview";
import { ProductsOverview } from "@/components/home/products-overview";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <ProductsOverview />
    </>
  );
}
