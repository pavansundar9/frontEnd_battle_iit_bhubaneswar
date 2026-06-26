import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import PricingSection from "@/components/PricingSection";
import StatsStrip from "@/components/StatsStrip";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureSection />
        <PricingSection />
        <StatsStrip />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}