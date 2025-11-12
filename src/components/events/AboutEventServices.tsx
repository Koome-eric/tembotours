import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Globe, Palette, Users, Handshake } from "lucide-react";

const features = [
  {
    icon: <CalendarCheck className="h-8 w-8 text-accent" />,
    title: "Full-Service Planning",
    description: "From venue selection to decor, entertainment & logistics.",
  },
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: "Destination Events",
    description: "We organize events in Kenya, Dubai, Rwanda, and beyond.",
  },
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: "Creative Design",
    description: "Creative design and theme development to match your vision.",
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    title: "Personalized Consultations",
    description: "Every event begins with understanding your unique vision.",
  },
  {
    icon: <Handshake className="h-8 w-8 text-accent" />,
    title: "Reliable Vendor Network",
    description: "Access to top-tier caterers, photographers, venues & more.",
  },
];


export function AboutEventServices() {
  return (
    <section className="container mx-auto max-w-7xl px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl font-bold">Why Choose Us to Plan Your Event</h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">
          We specialize in creating memorable experiences that align with your goals, style, and budget. Whether it’s a destination wedding, corporate retreat, or private celebration, our dedicated planners coordinate everything from concept to execution — ensuring a seamless, stress-free process.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                {feature.icon}
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
