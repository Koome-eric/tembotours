import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: "dest-diani",
    title: "Diani Beach, Kenya",
    description: "Luxury & sunshine from $299",
    href: "/hotels/search?destination=Diani%20Beach%2c%20Kenya",
    imageUrl: "/images/diani1.jpg",
  },
  {
    id: "dest-dubai",
    title: "Dubai, UAE",
    description: "Desert glam and futuristic beauty",
    href: "/hotels/search?destination=Dubai",
    imageUrl: "/images/dubai1.jpg",
  },
  {
    id: "dest-kigali",
    title: "Kigali, Rwanda",
    description: "Clean, calm, and cultural",
    href: "/hotels/search?destination=Kigali",
    imageUrl: "/images/kigali.jpg",
  },
  {
    id: "dest-mara",
    title: "Maasai Mara, Kenya",
    description: "Safari adventure of a lifetime",
    href: "/hotels/search?destination=Maasai%20Mara",
    imageUrl: "/images/mara.jpg",
  },
];

export function FeaturedDestinations() {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold">
            Top Destinations for Your Next Getaway
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Hand-picked adventures across Africa, the Middle East, and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest) => (
            <Link href={dest.href} key={dest.id} className="block">
              <Card className="overflow-hidden group relative">
                <CardContent className="p-0 aspect-[3/4]">
                  <Image
                    src={dest.imageUrl}
                    alt={dest.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="font-bold text-xl">{dest.title}</h3>
                    <p className="text-sm">{dest.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent border-primary text-primary hover:bg-primary/10"
          >
            <Link href="/hotels">View All Destinations</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
