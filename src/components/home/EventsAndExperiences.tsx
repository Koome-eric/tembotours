import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EventPlaceHolderImages } from "@/lib/events-placeholder-images";
import Image from "next/image";

export function EventsAndExperiences() {
  const eventImage = EventPlaceHolderImages.find(p => p.id === "event-hero");
  return (
    <section className="relative py-20 bg-background text-foreground">
         <div className="container mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div className="relative h-96 w-full">
                    {eventImage && (
                        <Image 
                            src={eventImage.imageUrl}
                            alt="Event planning"
                            fill
                            className="object-cover rounded-lg shadow-lg"
                            data-ai-hint={eventImage.imageHint}
                        />
                    )}
                </div>
                <div className="text-left">
                    <h2 className="font-headline text-3xl font-bold">🎉 Plan Your Next Event with Us</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        From corporate events and destination weddings to group tours and retreats, Tembo Tours provides full event logistics — venue booking, airport transfers, accommodation, catering, and entertainment.
                    </p>
                    <div className="mt-6 flex gap-4">
                        <Button asChild size="lg">
                            <Link href="/events#booking-form">Plan My Event</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/events#pricing">Get a Quote</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
