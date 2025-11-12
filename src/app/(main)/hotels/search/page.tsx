"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { Hotel } from '@/lib/types';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default function HotelSearchPage() {
  const searchParams = useSearchParams();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const destination = searchParams.get('destination');

  useEffect(() => {
    if (destination) {
      const fetchHotels = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/search?destination=${destination}`);
          if (!response.ok) {
            throw new Error('Failed to fetch hotels.');
          }
          const data = await response.json();
          setHotels(data.data || data); // supports either data shape
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchHotels();
    } else {
      setLoading(false);
    }
  }, [destination]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-5 h-5 text-accent fill-accent" />);
    }
    if (halfStar) {
      stars.push(<Star key="half" className="w-5 h-5 text-accent" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Hotel Results {destination && `in ${destination}`}</h1>
        <p className="text-muted-foreground">
          {loading ? 'Searching for the best hotels...' : `Found ${hotels.length} hotels for your stay.`}
        </p>
      </header>

      {error && <p className="text-destructive">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-52 w-full rounded-t-lg" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))
        ) : (
          hotels.map((hotel) => (
            <Card key={hotel.id} className="flex flex-col">
              <div className="relative h-52 w-full">
                <Image
                  src={hotel.main_photo}
                  alt={hotel.name}
                  fill
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle>{hotel.name}</CardTitle>
                <div className="flex items-center gap-1">
                  {renderStars(hotel.stars)}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{hotel.address}, {hotel.city}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/hotels/${hotel.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
       {!loading && hotels.length === 0 && !error && (
        <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No hotels found for this location. Try another search.</p>
        </div>
       )}
    </div>
  );
}
