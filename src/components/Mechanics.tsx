import { CheckCircle2, XCircle, CreditCard, Users, Radio, ShieldCheck } from "lucide-react";

const steps = [
  { num: 1, text: "Open a Smart Energy Pays account" },
  { num: 2, text: "You swap €1000 to SEP, you get a ticket for every swap!" },
  { num: 3, text: "Winners are selected transparently in a live stream." },
  { num: 4, text: "Regardless of outcome, you retain your premium benefits." },
];

const thisIs = [
  "Participation based game",
  "One time decision",
  "Real underlying value",
  "Transparent mechanics",
  "Premium first",
];

const thisIsNot = [
  "Gambling",
  "Repeated betting",
  "Empty ticket",
  "Hidden rules",
  "Prize only",
];

const Mechanics = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl space-y-20">
        {/* Steps */}
        <div className="space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
            How it works
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
            (Every €1000 bet = one additional chance to win — Maximum one prize per participant)
          </p>
        </div>

        {/* Comparison */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center text-foreground">
            What this is — and isn't
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* This Is */}
            <div className="glass rounded-xl p-6 space-y-4 border-primary/20">
              <h4 className="text-primary font-semibold text-lg text-center">This Is</h4>
              <div className="space-y-3">
                {thisIs.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary shrink-0" size={18} />
                    <span className="text-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* This Is NOT */}
            <div className="glass rounded-xl p-6 space-y-4 border-destructive/20">
              <h4 className="text-destructive font-semibold text-lg text-center">This Is NOT</h4>
              <div className="space-y-3">
                {thisIsNot.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <XCircle className="text-destructive shrink-0" size={18} />
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
