import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

const faqKeys = ["q1", "q2", "q3", "q4"] as const;

const FAQ = () => {
  const { t } = useTranslation();
  return (
    <section className="px-6 mx-0 my-0 py-0">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
          {t("faq.title")}
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqKeys.map((key, i) => (
            <AccordionItem
              key={key}
              value={`faq-${i}`}
              className="glass rounded-xl px-6 border-border/50"
            >
              <AccordionTrigger className="text-foreground text-left text-base font-medium hover:no-underline">
                {t(`faq.${key}`)}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base whitespace-pre-line">
                {t(`faq.a${key.slice(1)}`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;