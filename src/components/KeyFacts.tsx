import { Info } from "lucide-react";

const facts = [
  "Teilnahmefenster: bis 30. April 2026",
  "Ticket-Regel: 1 Ticket pro 1.000 € SEP‑Tausch",
  "Auswahl: transparent (Livestream) – Details in den Teilnahmebedingungen",
  "Max.: 1 Preis pro Teilnehmer",
  "Belohnungen: monatliche Stufen bis insgesamt €300.000 (nicht garantiert)",
];

const KeyFacts = () => {
  return (
    <section className="px-4 sm:px-6 pb-16">
      <div className="container mx-auto max-w-3xl">
        <div className="glass rounded-xl p-6 sm:p-8 space-y-4 border-primary/20">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-3">
            <Info className="text-primary shrink-0" size={22} />
            Kurz &amp; klar
          </h2>
          <ul className="space-y-2.5">
            {facts.map((fact) => (
              <li key={fact} className="flex items-start gap-3">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-foreground text-sm leading-relaxed">{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default KeyFacts;
