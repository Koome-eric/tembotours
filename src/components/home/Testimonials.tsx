"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Testimonial } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials: Testimonial[] = [
  {
    quote: "Tembo Tours made my Dubai visa and trip seamless! Highly recommend.",
    name: "Mary N.",
    role: "Kenya",
    avatar: "testimonial-mary",
  },
  {
    quote: "Booked my honeymoon to Zanzibar through them — flawless service.",
    name: "James & Grace",
    role: "Nairobi",
    avatar: "testimonial-james-grace",
  },
  {
    quote: "The professionalism and attention to detail for our corporate event were outstanding. Tembo Tours exceeded all our expectations.",
    name: "David Chen",
    role: "CEO, Tech Solutions",
    avatar: "testimonial-2",
  },
  {
    quote: "Our family trip to Dubai was magical, thanks to Tembo Tours. They curated activities that everyone, from kids to grandparents, enjoyed.",
    name: "The Sharma Family",
    role: "Family Vacationers",
    avatar: "testimonial-4",
  },
];

export function Testimonials() {
  const renderStars = () => {
    return Array(5).fill(null).map((_, i) => (
        <Star key={i} className="w-5 h-5 text-accent fill-accent" />
    ));
  }
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto max-w-7xl px-6 text-center">
        <h2 className="font-headline text-3xl font-bold">💬 What Our Clients Say</h2>
        <p className="mt-2 text-lg text-muted-foreground">Real stories from our satisfied travelers.</p>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-12 w-full max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const image = PlaceHolderImages.find(p => p.id === testimonial.avatar);
              return (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border-none bg-transparent shadow-none">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="flex gap-1 mb-4">
                            {renderStars()}
                        </div>
                        <p className="text-xl italic text-foreground">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="mt-6 flex items-center">
                          {image && (
                             <Avatar>
                              <AvatarImage src={image.imageUrl} alt={testimonial.name} data-ai-hint={image.imageHint} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className="ml-4 text-left">
                            <p className="font-semibold">&mdash; {testimonial.name}, {testimonial.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
