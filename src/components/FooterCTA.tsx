import { useState } from "react";
import { Mail } from "lucide-react";

const FooterCTA = () => {
  const [email, setEmail] = useState("");

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

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
            />
          </div>
          <button className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:brightness-110 animate-pulse-glow whitespace-nowrap">
            Secure Your Spot
          </button>
        </div>

        <div className="pt-12 border-t border-border/30 text-xs text-muted-foreground space-y-1">
          <p>© 2026 Smart Energy Pay. All rights reserved.</p>
          <p>Terms & Conditions · Privacy Policy · Contact</p>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
