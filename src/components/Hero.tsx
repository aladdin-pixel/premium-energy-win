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

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">Smart Energy Pay gives you immediate premium benefits, and one optional chance to win significant monthly SEP rewards. Up to €300.000

        </p>

        {/* Video embed */}
        <div className="max-w-2xl mx-auto rounded-xl overflow-hidden border border-border/50 glow-green">
          <div className="relative w-full" style={{ padding: "56.25% 0 0 0" }}>
            <iframe
              src="https://player.vimeo.com/video/1165639970?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute top-0 left-0 w-full h-full"
              title="SmartEnergyPay_Promo_FirstDraft" />
          </div>
        </div>

        <p className="text-sm text-muted-foreground tracking-widest uppercase">
          Easy entry · Clear rules · Closing April 30, 2026
        </p>

        {/* Omnisend embed */}
        <div className="max-w-md mx-auto">
          <div id="omnisend-embedded-v2-699f72cff447765c8535ff85"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
