import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import GameSection from "@/components/GameSection";
import Mechanics from "@/components/Mechanics";
import FAQ from "@/components/FAQ";
import FooterCTA from "@/components/FooterCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <GameSection />
      <Mechanics />
      <FAQ />
      <FooterCTA />
    </div>
  );
};

export default Index;
