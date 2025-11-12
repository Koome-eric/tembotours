"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventPlaceHolderImages } from "@/lib/events-placeholder-images";
import Image from "next/image";

const testimonials = [
  {
    quote: "Tembo Events made our wedding a dream come true! Everything was perfectly organized — from décor to entertainment. We didn’t have to stress about anything.",
    name: "Sarah & Daniel",
    role: "Nairobi",
    avatar: "event-testimonial-1",
  },
  {
    quote: "The professionalism and attention to detail for our corporate event were outstanding. Tembo Tours exceeded all our expectations.",
    name: "Johnathan Lee",
    role: "CEO, Tech Innovators",
    avatar: "event-testimonial-2",
  },
  {
    quote: "An absolutely seamless experience. The event flow was flawless. I'll definitely be using their services for all my future corporate parties.",
    name: "Maria Rodriguez",
    role: "Marketing Director",
    avatar: "event-testimonial-3",
  },
];

export function EventTestimonials() {
  return (
    <section className="py-20">
      <div className="container mx-auto max-w-7xl px-6 text-center">
        <h2 className="font-headline text-3xl font-bold">What Our Clients Say</h2>
        <p className="mt-2 text-lg text-muted-foreground">Real stories from our satisfied clients.</p>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto mt-12 w-full max-w-4xl"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const image = EventPlaceHolderImages.find(p => p.id === testimonial.avatar);
              return (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border-none bg-transparent shadow-none">
                      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-xl italic text-foreground">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                        <div className="mt-6 flex items-center">
                          {image && (
                             <Avatar className="h-12 w-12">
                              <AvatarImage asChild>
                                <Image 
                                  src={image.imageUrl} 
                                  alt={testimonial.name} 
                                  width={48} 
                                  height={48}
                                />
                              </AvatarImage>
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          )}
                          <div className="ml-4 text-left">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
