import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How far in advance should I book your services?",
    answer: "We recommend booking at least 6-12 months in advance for large events like weddings, and 2-3 months for smaller functions. However, we can accommodate shorter timelines based on availability."
  },
  {
    question: "Do you offer event planning outside Kenya/Dubai?",
    answer: "Yes! We specialize in destination events and have a network of partners in several countries, including Rwanda, Tanzania, and beyond. Contact us to discuss your desired location."
  },
  {
    question: "Can you work with my preferred vendors?",
    answer: "Absolutely. We are happy to collaborate with your chosen vendors. We can also recommend trusted partners from our extensive network to ensure quality and reliability."
  },
  {
    question: "What is your payment structure?",
    answer: "We typically require an initial deposit to secure your date, followed by a structured payment plan. The final balance is usually due a few weeks before the event date. We will provide a detailed breakdown in our proposal."
  },
  {
    question: "Do you handle event permits and logistics?",
    answer: "Yes, our full-service planning packages include managing all necessary permits, licenses, and logistical coordination to ensure your event runs smoothly and complies with all local regulations."
  }
]

export function EventFaq() {
  return (
    <section className="container mx-auto max-w-3xl px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl font-bold">Frequently Asked Questions</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Answering your common questions to help you get started.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
