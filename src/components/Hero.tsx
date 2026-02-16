import { ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-foreground">
          Get premium benefits, and a one-time chance to win{" "}
          <span className="text-gradient-green">€300K over time.</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Smart Energy Pay gives you immediate premium benefits, and one optional chance to win significant monthly SEP rewards. Up to €300.000.
        </p>

        {/* Video embed */}
        <div className="max-w-2xl mx-auto rounded-xl overflow-hidden border border-border/50 glow-green">
          <div className="aspect-video">
            <iframe
              src="https://drive.google.com/file/d/1uPs4N6Jt2ikz1gSr_cG2sEpNkkBGHrb3/preview"
              className="w-full h-full"
              allow="autoplay"
              allowFullScreen
              title="Smart Energy Pay Introduction"
            />
          </div>
        </div>

        <p className="text-sm text-muted-foreground tracking-widest uppercase">
          Easy entry · Clear rules · Closing April 30, 2026
        </p>

        <a
          href="#footer-cta"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:brightness-110 animate-pulse-glow"
        >
          Secure your spot
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
