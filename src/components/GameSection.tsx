import { Ban, Eye, FileText, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";

const ruleKeys = ["noSubscription", "noPurchases", "transparentDraw", "clearRules"] as const;
const ruleIcons = [Ban, Ban, Eye, FileText];

const prizes = [
  { amount: "€1,000", periodKey: "periodMonth1", total: "€12K" },
  { amount: "€2,000", periodKey: "periodMonth2", total: "€48K" },
  { amount: "€3,000", periodKey: "periodMonth3", total: "€108K" },
  { amount: "€4,000", periodKey: "periodMonth4", total: "€192K" },
  { amount: "€5,000", periodKey: "periodMonth5", total: "€300K" },
];

const GameSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl space-y-20">
        {/* Rules */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t("game.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("game.subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            {ruleKeys.map((key, i) => {
              const Icon = ruleIcons[i];
              return (
                <div key={key} className="glass rounded-xl px-5 py-3 flex items-center gap-3">
                  <Icon className="text-primary" size={18} />
                  <span className="text-sm text-foreground">{t(`game.${key}`)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Prizes */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center text-foreground flex items-center justify-center gap-3">
            <Trophy className="text-primary" size={24} />
            {t("game.prizesTitle")}
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
                <div className="text-sm text-muted-foreground">{t(`game.${prize.periodKey}`)}</div>
                <div className="text-xs text-primary font-semibold tracking-wider uppercase">
                  {t("game.total")}: {prize.total}
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
