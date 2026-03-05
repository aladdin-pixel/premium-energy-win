import { Mail } from "lucide-react";
import { useEmailSubmit } from "@/hooks/useEmailSubmit";

const FooterCTA = () => {
  const { email, setEmail, honeypot, setHoneypot, submitting, handleSubmit } = useEmailSubmit("footer");

  return (
    <section id="footer-cta" className="py-24 px-4 sm:px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto max-w-2xl text-center space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
          Teilnahmefenster schließt am{" "}
          <span className="text-gradient-green">30. April 2026</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Nach diesem Datum: Keine neuen Einträge. Das Fenster schließt sich einmalig – für alle.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="email"
              placeholder="name@beispiel.de"
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
            {submitting ? "Wird gesendet…" : "E‑Mail eintragen"}
          </button>
        </div>

        {/* Organizer line */}
        <div className="pt-8 text-xs text-muted-foreground">
          <p>Veranstalter: [Rechtsname], [Adresse], [Handelsregister]</p>
        </div>

        <div className="pt-4 border-t border-border/30 text-xs text-muted-foreground space-y-2">
          <p>© 2026 Smart Energy Pays. Alle Rechte vorbehalten.</p>
          <div className="flex flex-wrap justify-center gap-3" id="impressum">
            <a href="#teilnahmebedingungen" className="underline hover:text-foreground">Teilnahmebedingungen (AGB)</a>
            <span>·</span>
            <a href="#datenschutz" className="underline hover:text-foreground">Datenschutzrichtlinie</a>
            <span>·</span>
            <a href="#kontakt" className="underline hover:text-foreground">Kontakt</a>
            <span>·</span>
            <a href="#impressum" className="underline hover:text-foreground">Impressum</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
