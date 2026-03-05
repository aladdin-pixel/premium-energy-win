import { Mail, ShieldCheck } from "lucide-react";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";

const Hero = () => {
  const { email, setEmail, honeypot, setHoneypot, submitting, handleSubmit } = useEmailSubmit("hero");

  return (
    <section className="relative min-h-[auto] sm:min-h-screen flex flex-col items-center justify-center pt-20 sm:pt-24 pb-10 sm:pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5 sm:space-y-8">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground">
          Premium‑Vorteile sichern – und sich optional für die Chance auf bis zu{" "}
          <span className="text-gradient-green">€300.000 registrieren</span>
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Tragen Sie Ihre E‑Mail ein und erhalten Sie eine kurze Übersicht zu Ablauf, Teilnahmebedingungen und Fristen. Die Teilnahme am Programm erfordert später einen SEP‑Tausch von 1.000&nbsp;€ pro Ticket.
        </p>

        {/* Email signup — conversion-first on mobile */}
        <div id="hero-email" className="space-y-3 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="email"
                placeholder="name@beispiel.de"
                aria-label="E‑Mail-Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
            </div>
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="absolute opacity-0 pointer-events-none h-0 w-0"
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="h-12 px-6 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all hover:brightness-110 animate-pulse-glow whitespace-nowrap disabled:opacity-70"
            >
              {submitting ? "Wird gesendet…" : "Regeln & Updates per E‑Mail erhalten"}
            </button>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Wir senden Ihnen die Bestätigung + die nächsten Schritte. Kein Spam. Abmeldung jederzeit. Datenschutz nach DSGVO.
          </p>
          {/* Trust links */}
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <ShieldCheck size={14} className="text-primary" />
            <a href="#datenschutz" className="underline hover:text-foreground">Datenschutz</a>
            <span>·</span>
            <a href="#teilnahmebedingungen" className="underline hover:text-foreground">Teilnahmebedingungen</a>
            <span>·</span>
            <a href="#kontakt" className="underline hover:text-foreground">Kontakt</a>
            <span>·</span>
            <a href="#impressum" className="underline hover:text-foreground">Impressum</a>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground tracking-widest uppercase">
          Einfacher Einstieg · Klare Regeln · Teilnahmefenster endet am 30. April 2026
        </p>

        {/* Video embed — smaller on mobile */}
        <div className="max-w-2xl mx-auto rounded-xl overflow-hidden border border-border/50 glow-green">
          <div className="relative w-full" style={{ padding: "56.25% 0 0 0" }}>
            <iframe
              src="https://player.vimeo.com/video/1165639970?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute top-0 left-0 w-full h-full"
              title="SmartEnergyPay Promo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
