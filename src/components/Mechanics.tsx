import { CheckCircle2, XCircle } from "lucide-react";

const steps = [
  { num: 1, text: "Eröffnen Sie ein Smart Energy Pays Konto" },
  { num: 2, text: "Pro 1.000 € SEP‑Tausch erhalten Sie ein Ticket" },
  { num: 3, text: "Die Auswahl erfolgt transparent im Livestream" },
  { num: 4, text: "Unabhängig vom Ergebnis behalten Sie Ihre Premium‑Vorteile" },
];

const thisIs = [
  "Premium‑Vorteile, die Sie sofort nutzen können",
  "Ein optionales Teilnahmeprogramm mit klaren Regeln",
  "Ein zeitlich begrenztes Teilnahmefenster (bis 30. April 2026)",
  "Transparente Belohnungsstufen (Details in den Teilnahmebedingungen)",
  "Updates per E‑Mail, damit Sie keine Fristen verpassen",
];

const thisIsNot = [
  "Keine garantierte Auszahlung oder ‚sicheres Einkommen'",
  "Kein Versprechen, dass Sie €300.000 erhalten",
  "Kein Spam-Abo – Abmeldung jederzeit",
  "Kein Ersatz für professionelle Finanzberatung",
];

const Mechanics = () => {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl space-y-20">
        {/* Steps */}
        <div className="space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
            So funktioniert es
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="glass rounded-xl p-6 flex items-start gap-4">
                <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-sm">
                  {step.num}
                </div>
                <p className="text-foreground text-base leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground italic">
            (Pro 1.000 € SEP‑Tausch = ein zusätzliches Ticket — Maximal ein Preis pro Teilnehmer)
          </p>
        </div>

        {/* Comparison */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center text-foreground">
            Was das ist – und was nicht
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Das ist */}
            <div className="glass rounded-xl p-6 space-y-4 border-primary/20">
              <h4 className="text-primary font-semibold text-lg text-center">Das ist</h4>
              <div className="space-y-3">
                {thisIs.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={18} />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Das ist NICHT */}
            <div className="glass rounded-xl p-6 space-y-4 border-destructive/20">
              <h4 className="text-destructive font-semibold text-lg text-center">Das ist NICHT</h4>
              <div className="space-y-3">
                {thisIsNot.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <XCircle className="text-destructive shrink-0 mt-0.5" size={18} />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mechanics;
