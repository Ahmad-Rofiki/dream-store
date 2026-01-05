import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import { HighlightProvider } from "@/components/HighlightContext";
import ProductGrid from "@/components/ProductGrid";


export default function Page() {
  return (
    <HighlightProvider>
      <Hero />
      <ProductGrid />
      <Contact />
    </HighlightProvider>
  );
}
