import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import KeyFacts from "@/components/KeyFacts";
import MiniFAQ from "@/components/MiniFAQ";
import Features from "@/components/Features";
import GameSection from "@/components/GameSection";
import Mechanics from "@/components/Mechanics";
import FAQ from "@/components/FAQ";
import FooterCTA from "@/components/FooterCTA";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-16 sm:pb-0">
      <Navbar />
      <Hero />
      <KeyFacts />
      <MiniFAQ />
      <Features />
      <GameSection />
      <Mechanics />
      <FAQ />
      <FooterCTA />
      <MobileStickyCTA />
    </div>
  );
};

export default Index;
