"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "../ui/badge";

const offers = [
  {
    id: "offer-zanzibar",
    title: "Weekend Flights to Zanzibar",
    deal: "Save 25%",
  },
  {
    id: "offer-hotel",
    title: "Early Bird Hotel Discounts",
    deal: "Up to 40% Off",
  },
  {
    id: "offer-combo",
    title: "Visa + Flight Combo Packages",
    deal: "Best Value for 2025",
  },
   {
    id: "offer-safari",
    title: "Last Minute Safari Deals",
    deal: "From $399",
  }
];

export function SpecialOffers() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold">🎯 Exclusive Deals You’ll Love</h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {offers.map((offer) => {
              const image = PlaceHolderImages.find((p) => p.id === offer.id);
              return (
                <CarouselItem key={offer.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden group relative">
                      <CardContent className="p-0 aspect-video">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={image.imageHint}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <div className="absolute top-4 right-4">
                            <Badge variant="destructive" className="text-lg py-1 px-3">{offer.deal}</Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 text-white">
                          <h3 className="font-bold text-lg">{offer.title}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12"/>
        </Carousel>
      </div>
    </section>
  );
}
