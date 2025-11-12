import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EventPlaceHolderImages } from "@/lib/events-placeholder-images";

export function EventHero() {
  const heroImage = EventPlaceHolderImages.find(p => p.id === "event-hero");

  return (
    <section className="relative h-[500px] w-full">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
        <h1 className="font-headline text-4xl font-bold md:text-6xl">
          Turning Your Vision Into an Unforgettable Experience
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl">
          From intimate gatherings to grand celebrations, our expert event planners handle every detail — so you can enjoy your special day stress-free.
        </p>
        <div className="mt-8 flex gap-4">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#booking-form">Book Our Services</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
            <Link href="#pricing">View Event Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
