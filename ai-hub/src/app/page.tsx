import { Hero } from "@/components/home/hero";
import { PersonaSelector } from "@/components/home/persona-selector";
import { FeaturedSection } from "@/components/home/featured-section";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Persona selector */}
      <section className="border-y border-border/50 bg-muted/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <PersonaSelector />
        </div>
      </section>

      <FeaturedSection />
    </>
  );
}
