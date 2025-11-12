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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EventPlaceHolderImages } from "@/lib/events-placeholder-images";


export function EventGallery() {

  const images = EventPlaceHolderImages.filter(i => i.id.startsWith("gallery-"));

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto max-w-7xl px-6 text-center">
        <h2 className="font-headline text-3xl font-bold">Our Portfolio</h2>
        <p className="mt-2 text-lg text-muted-foreground">A glimpse into the unforgettable moments we've created.</p>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-12 w-full max-w-5xl"
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="relative aspect-square flex items-center justify-center p-0">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="rounded-lg object-cover"
                        data-ai-hint={image.imageHint}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/40 rounded-lg" />
                      <div className="relative text-white text-center p-4">
                        <h3 className="font-bold text-lg">{image.title}</h3>
                        <p className="text-sm">{image.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Button asChild variant="outline" className="mt-8" size="lg">
            <Link href="/events/gallery">See Full Portfolio</Link>
        </Button>
      </div>
    </section>
  );
}
