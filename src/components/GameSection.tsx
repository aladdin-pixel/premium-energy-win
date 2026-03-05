import { FileText, Eye, ShieldCheck, Trophy } from "lucide-react";

const rules = [
  { icon: FileText, text: "Klare Teilnahmebedingungen" },
  { icon: Eye, text: "Transparente Auswahl im Livestream" },
  { icon: ShieldCheck, text: "Für ein Ticket ist ein SEP‑Tausch von 1.000 € erforderlich. Darüber hinaus gibt es keine weiteren Pflichtkäufe." },
];

const prizes = [
  { amount: "€1.000", period: "jeden Monat für 1 Jahr", total: "€12K" },
  { amount: "€2.000", period: "jeden Monat für 2 Jahre", total: "€48K" },
  { amount: "€3.000", period: "jeden Monat für 3 Jahre", total: "€108K" },
  { amount: "€4.000", period: "jeden Monat für 4 Jahre", total: "€192K" },
  { amount: "€5.000", period: "jeden Monat für 5 Jahre", total: "€300K" },
];

const GameSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl space-y-20">
        {/* Rules */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Teilnahmeprogramm (transparent &amp; zeitlich begrenzt)
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Registrierte Teilnehmer können gemäß Teilnahmebedingungen Tickets erhalten. Die Auswahl erfolgt transparent und wird im Livestream begleitet.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {rules.map(({ icon: Icon, text }) => (
              <div key={text} className="glass rounded-xl px-5 py-3 flex items-center gap-3 max-w-sm">
                <Icon className="text-primary shrink-0" size={18} />
                <span className="text-sm text-foreground text-left">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prizes */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center text-foreground flex items-center justify-center gap-3">
            <Trophy className="text-primary" size={24} />
            Belohnungsstufen
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {prizes.map((prize, i) => (
              <div
                key={prize.amount}
                className={`glass rounded-xl p-6 text-center space-y-3 transition-all hover:border-primary/40 ${
                  i === prizes.length - 1 ? "sm:col-span-2 lg:col-span-1 border-primary/30 glow-green" : ""
                }`}
              >
                <div className="text-3xl font-bold text-gradient-green">{prize.amount}</div>
                <div className="text-sm text-muted-foreground">{prize.period}</div>
                <div className="text-xs text-primary font-semibold tracking-wider uppercase">
                  Gesamt: {prize.total}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Belohnungsstufen sind nicht garantiert. Details in den <a href="#teilnahmebedingungen" className="underline hover:text-foreground">Teilnahmebedingungen</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
