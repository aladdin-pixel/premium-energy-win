import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const benefitKeys = ["benefit1", "benefit2", "benefit3", "benefit4"] as const;

const Features = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t("features.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {t("features.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {benefitKeys.map((key) => (
            <div
              key={key}
              className="glass rounded-xl p-6 flex items-start gap-4 transition-all hover:border-primary/40 hover:glow-green"
            >
              <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={22} />
              <span className="text-foreground text-base">{t(`features.${key}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;