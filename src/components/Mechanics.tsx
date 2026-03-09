import { CheckCircle2, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const stepKeys = ["step1", "step2", "step3", "step4"] as const;
const thisIsKeys = ["is1", "is2", "is3", "is4", "is5"] as const;
const thisIsNotKeys = ["not1", "not2", "not3", "not4", "not5"] as const;

const Mechanics = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl space-y-20">
        {/* Steps */}
        <div className="space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground">
            {t("mechanics.title")}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {stepKeys.map((key, i) => (
              <div key={key} className="glass rounded-xl p-6 flex items-start gap-4">
                <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-primary/10 border border-primary/30 text-primary font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-foreground text-base leading-relaxed">{t(`mechanics.${key}`)}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground italic">
            {t("mechanics.disclaimer")}
          </p>
        </div>

        {/* Comparison */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center text-foreground">
            {t("mechanics.comparisonTitle")}
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6 space-y-4 border-primary/20">
              <h4 className="text-primary font-semibold text-lg text-center">{t("mechanics.thisIs")}</h4>
              <div className="space-y-3">
                {thisIsKeys.map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <CheckCircle2 className="text-primary shrink-0" size={18} />
                    <span className="text-foreground text-sm">{t(`mechanics.${key}`)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-6 space-y-4 border-destructive/20">
              <h4 className="text-destructive font-semibold text-lg text-center">{t("mechanics.thisIsNot")}</h4>
              <div className="space-y-3">
                {thisIsNotKeys.map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <XCircle className="text-destructive shrink-0" size={18} />
                    <span className="text-foreground text-sm">{t(`mechanics.${key}`)}</span>
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
