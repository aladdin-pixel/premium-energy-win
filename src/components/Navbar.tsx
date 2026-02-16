import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Smart Energy Pay" className="h-10 w-10 object-contain" />
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Smart Energy Pay
          </span>
        </div>
        <a
          href="#footer-cta"
          className="hidden sm:inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 glow-green"
        >
          Secure Your Spot
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
