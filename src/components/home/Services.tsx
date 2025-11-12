import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Hotel, FileText, Briefcase, Users, PartyPopper } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: <Plane className="h-8 w-8 text-accent" />,
    title: "Flight Booking",
    description: "Find the best deals on flights to your dream destinations.",
    href: "/flights",
  },
  {
    icon: <Hotel className="h-8 w-8 text-accent" />,
    title: "Hotel Stays",
    description: "Handpicked luxury hotels and resorts for ultimate comfort.",
    href: "/hotels",
  },
  {
    icon: <FileText className="h-8 w-8 text-accent" />,
    title: "Visa Processing",
    description: "Expert assistance for a hassle-free visa application.",
    href: "/visa",
  },
  {
    icon: <PartyPopper className="h-8 w-8 text-accent" />,
    title: "Event Planning",
    description: "Crafting unforgettable weddings, corporate functions, and more.",
    href: "/events",
  },
];

export function Services() {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold">Everything You Need for the Perfect Trip</h2>
          <p className="mt-2 text-lg text-muted-foreground">We offer a complete range of services to make your travel seamless and memorable.</p>
        </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
            <Link href={service.href} key={service.title} className="block">
                <Card className="text-center transition-all hover:shadow-lg hover:-translate-y-2 h-full">
                    <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        {service.icon}
                    </div>
                    </CardHeader>
                    <CardContent>
                    <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                    </CardContent>
                </Card>
            </Link>
        ))}
      </div>
    </section>
  );
}
