import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need to be a new client?",
    answer:
      "No. Existing clients can participate as well. Everybody is welcome.",
  },
  {
    question: "How many tickets can I get?",
    answer:
      "As many as you want. Each €1,000 swapped into $SEP counts as one entry.",
  },
  {
    question: "Do I need a specific subscription (Platinum / Premium)?",
    answer:
      "No. All subscriptions allow you to access the benefits.",
  },
  {
    question: "What can I actually win?",
    answer:
      "Up to €5,000 per month for 5 years.\nPlus ecosystem benefits such as exclusive discounts and access perks.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
          Frequently Asked Questions
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
