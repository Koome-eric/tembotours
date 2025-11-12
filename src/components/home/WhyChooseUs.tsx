import { ShieldCheck, Globe, Star, Users } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Reliability",
    description: "We ensure every detail of your trip is handled with utmost care and professionalism."
  },
  {
    icon: <Globe className="h-10 w-10 text-primary" />,
    title: "Global Expertise",
    description: "Our team has extensive knowledge to plan your perfect international or local trip."
  },
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: "Luxury & Comfort",
    description: "We partner with the best to provide you with a premium travel experience."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Personalized Service",
    description: "Your journey is tailored to your preferences, ensuring a unique and memorable adventure."
  }
];

export function WhyChooseUs() {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold">Why Choose Tembo Tours?</h2>
          <p className="mt-2 text-lg text-muted-foreground">Your trust is our top priority. Here’s why we stand out.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-md">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
