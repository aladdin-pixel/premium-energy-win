import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const miniFaqs = [
  {
    question: "Was bekomme ich nach der E‑Mail?",
    answer: "Eine Kurz‑Übersicht der Regeln, Fristen und den Link zu den Teilnahmebedingungen.",
  },
  {
    question: "Was kostet die Teilnahme?",
    answer: "Die Registrierung per E‑Mail ist kostenlos. Ein Ticket erfordert später einen SEP‑Tausch von 1.000 €.",
  },
  {
    question: "Wie werden Gewinner ausgewählt?",
    answer: "Transparent im Livestream – Zeitpunkt und Mechanik stehen in den Teilnahmebedingungen.",
  },
  {
    question: "Wie oft schreibt ihr mir?",
    answer: "Nur wichtige Updates zu Ablauf und Frist. Abmeldung jederzeit.",
  },
];

const MiniFAQ = () => {
  return (
    <section className="px-4 sm:px-6 pb-16">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-6">
          Häufige Fragen
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {miniFaqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`mini-faq-${i}`}
              className="glass rounded-xl px-6 border-border/50"
            >
              <AccordionTrigger className="text-foreground text-left text-sm font-medium hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default MiniFAQ;
