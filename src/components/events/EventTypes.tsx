import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { EventPlaceHolderImages } from "@/lib/events-placeholder-images";


const eventTypes = [
  {
    id: "event-wedding",
    title: "Weddings & Engagements",
    description: "Elegant, romantic, and uniquely yours.",
  },
  {
    id: "event-corporate",
    title: "Corporate Events",
    description: "Conferences, retreats, and brand launches.",
  },
  {
    id: "event-private",
    title: "Private Celebrations",
    description: "Birthdays, anniversaries, and family reunions.",
  },
  {
    id: "event-destination",
    title: "Cultural & Destination Events",
    description: "Traditional ceremonies and exotic experiences.",
  }
];


export function EventTypes() {
  return (
    <section className="bg-secondary py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold">Types of Events We Plan</h2>
            <p className="mt-2 text-lg text-muted-foreground">Showcasing our versatility in event management.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eventTypes.map((eventType) => {
             const image = EventPlaceHolderImages.find(p => p.id === eventType.id);
             return (
                <Card key={eventType.id} className="overflow-hidden group">
                    <CardContent className="p-0 relative h-80">
                        {image && (
                            <Image
                                src={image.imageUrl}
                                alt={image.description}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={image.imageHint}
                            />
                        )}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                         <div className="absolute bottom-0 left-0 p-4 text-white">
                            <h3 className="font-bold text-lg">{eventType.title}</h3>
                            <p className="text-sm">{eventType.description}</p>
                         </div>
                    </CardContent>
                </Card>
             );
          })}
        </div>
      </div>
    </section>
  );
}
