const MobileStickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden glass border-t border-border/30 p-3">
      <a
        href="#hero-email"
        className="flex items-center justify-center w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:brightness-110 animate-pulse-glow"
      >
        E‑Mail eintragen
      </a>
    </div>
  );
};

export default MobileStickyCTA;
