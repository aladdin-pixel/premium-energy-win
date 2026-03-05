import { Ban, Eye, FileText, ShieldCheck, Trophy } from "lucide-react";

const rules = [
  { icon: Ban, text: "No subscription" },
  { icon: Ban, text: "No additional purchases" },
  { icon: Eye, text: "Transparent draw" },
  { icon: FileText, text: "Clear rules" },
];

const prizes = [
  { amount: "€1,000", period: "every month for 1 year", total: "€12K" },
  { amount: "€2,000", period: "every month for 2 years", total: "€48K" },
  { amount: "€3,000", period: "every month for 3 years", total: "€108K" },
  { amount: "€4,000", period: "every month for 4 years", total: "€192K" },
  { amount: "€5,000", period: "every month for 5 years", total: "€300K" },
];

const GameSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl space-y-20">
        {/* Rules */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            The participation-based game
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Premium account holders may participate in a one-time, participation-based game with real prizes.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {rules.map(({ icon: Icon, text }) => (
              <div key={text} className="glass rounded-xl px-5 py-3 flex items-center gap-3">
                <Icon className="text-primary" size={18} />
                <span className="text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prizes */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center text-foreground flex items-center justify-center gap-3">
            <Trophy className="text-primary" size={24} />
            The Prizes
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
                  Total: {prize.total}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
