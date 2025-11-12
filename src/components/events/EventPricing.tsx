import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Essential",
    price: "$500",
    description: "Ideal for small celebrations and gatherings.",
    features: ["Venue Consultation", "Decor Coordination", "Catering Coordination"],
  },
  {
    name: "Signature",
    price: "$1,200",
    description: "Our most popular package for weddings and corporate events.",
    features: ["Full Event Design", "Vendor Management", "On-site Coordination", "Timeline Creation"],
    isFeatured: true,
  },
  {
    name: "Luxury Experience",
    price: "Custom",
    description: "A bespoke solution for large-scale or destination events.",
    features: ["Premium Design & Decor", "Full Vendor Management", "Guest & Travel Integration", "Multi-day Coordination"],
  }
];

export function EventPricing() {
  return (
    <section id="pricing" className="container mx-auto max-w-7xl px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="font-headline text-3xl font-bold">Packages & Pricing</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Transparent pricing for every need and budget.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <Card key={pkg.name} className={`flex flex-col ${pkg.isFeatured ? 'border-primary ring-2 ring-primary' : ''}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-center mb-6">
                <span className="text-4xl font-bold">{pkg.price}</span>
                <span className="text-muted-foreground">{pkg.name !== 'Luxury Experience' && ' starting from'}</span>
              </div>
              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
                <Button asChild className={`w-full ${pkg.isFeatured ? 'bg-accent text-accent-foreground hover:bg-accent/90' : ''}`} variant={pkg.isFeatured ? 'default' : 'outline'}>
                    <Link href="#booking-form">
                        {pkg.name === 'Luxury Experience' ? 'Get Custom Quote' : 'Select Package'}
                    </Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
