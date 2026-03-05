import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Zugang zum Smart Energy Pay Ökosystem",
  "Teilnahme an der Zukunft von Energie und Finanzen",
  "Partner-Vorteile (je nach Verfügbarkeit), z. B. exklusive Rabatte auf ausgewählte Fahrzeuge",
  "Langfristiger Nutzen, keine kurzfristige Spekulation",
];

const Features = () => {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Premium‑Vorteile, die sofort wirken
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ein Smart Energy Pays Premium‑Konto gibt Ihnen Zugang zu konkreten Vorteilen – unabhängig vom Ergebnis des Teilnahmeprogramms.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit}
              className="glass rounded-xl p-6 flex items-start gap-4 transition-all hover:border-primary/40 hover:glow-green"
            >
              <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={22} />
              <span className="text-foreground text-base">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
