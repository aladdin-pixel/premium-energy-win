const FooterCTA = () => {
  return (
    <section id="footer-cta" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-2xl text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Participation window closes on{" "}
          <span className="text-gradient-green">April 30, 2026</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          After this date: No new entries. The window closes once — for all.
        </p>

        <div className="max-w-md mx-auto">
          <div id="omnisend-embedded-v2-699f72cff447765c8535ff85"></div>
        </div>

        <div className="pt-12 border-t border-border/30 text-xs text-muted-foreground space-y-1">
          <p>© 2026 Smart Energy Pays. All rights reserved.</p>
          <p>
            <a href="https://smartenergypays.io/legal-regulatory-information">Imprint</a>
            {" · "}
            <a href="https://smartenergypays.io/legal/privacy-policy">Privacy Policy</a>
            {" · "}
            <a href="https://smartenergypays.io/legal-regulatory-information">Legal</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
