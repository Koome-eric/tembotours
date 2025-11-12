import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { EventPlaceHolderImages } from '@/lib/events-placeholder-images';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GalleryPage() {
  const images = EventPlaceHolderImages.filter(i => i.id.startsWith("gallery-") || i.id.startsWith("event-"));

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold">Event Gallery</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Explore a collection of moments from our beautifully orchestrated events.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden group">
            <CardContent className="p-0 relative aspect-[4/3]">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                {image.title && <h3 className="font-bold text-lg">{image.title}</h3>}
                {image.location && <p className="text-sm">{image.location}</p>}
                {!image.title && <p className='text-sm'>{image.description}</p>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <Link href="/contact?subject=Event+Inquiry">Plan Your Event</Link>
        </Button>
      </div>
    </div>
  );
}
