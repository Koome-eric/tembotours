import { PartyPopper, BotMessageSquare, PencilRuler, ClipboardCheck, Award } from "lucide-react";

const processSteps = [
  {
    icon: <BotMessageSquare className="h-8 w-8 text-primary" />,
    title: "1. Initial Consultation",
    description: "We start by discussing your vision, goals, style, and budget to understand exactly what you're looking for.",
  },
  {
    icon: <PencilRuler className="h-8 w-8 text-primary" />,
    title: "2. Concept & Proposal",
    description: "Our creative team develops a tailored event concept, complete with a detailed proposal and estimated costs.",
  },
  {
    icon: <ClipboardCheck className="h-8 w-8 text-primary" />,
    title: "3. Planning & Coordination",
    description: "We handle all the details: booking venues, managing vendors, coordinating logistics, and keeping you updated.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "4. Execution Day",
    description: "Our on-site coordinators manage the entire event from start to finish, ensuring everything runs flawlessly.",
  },
];


export function PlanningProcess() {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl font-bold">Our Planning Process</h2>
        <p className="mt-2 text-lg text-muted-foreground">A structured approach to ensure a seamless and stress-free experience.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {processSteps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary shadow-md">
                {step.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
    </section>
  );
}
