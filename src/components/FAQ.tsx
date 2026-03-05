import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Muss ich ein neuer Kunde sein, um teilzunehmen?",
    answer: "Nein. Auch bestehende Kunden können teilnehmen. Jeder ist willkommen.",
  },
  {
    question: "Wie viele Tickets kann ich erhalten?",
    answer: "So viele wie Sie möchten. Jeder SEP‑Tausch von 1.000 € zählt als ein Ticket.",
  },
  {
    question: "Brauche ich ein bestimmtes Abonnement, um auf die Vorteile zuzugreifen?",
    answer: "Nein. Alle Abonnements ermöglichen den Zugang zu den Vorteilen.",
  },
  {
    question: "Was kann ich gewinnen?",
    answer:
      "Bis zu 5.000 € pro Monat für 5 Jahre.\nPlus Ökosystem-Vorteile wie exklusive Rabatte und Zugangsvorteile.\n\nBelohnungen sind nicht garantiert – Details in den Teilnahmebedingungen.",
  },
];

const FAQ = () => {
  return (
    <section className="px-4 sm:px-6 mx-0 my-0 py-0">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
          Weitere Fragen
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="glass rounded-xl px-6 border-border/50"
            >
              <AccordionTrigger className="text-foreground text-left text-base font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
