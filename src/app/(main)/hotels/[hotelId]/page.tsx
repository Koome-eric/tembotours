"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Hotel } from '@/lib/types';
import { Star, Wifi, ParkingSquare, Utensils, Tv, Wind, CheckCircle, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { RoomRates } from '@/components/hotels/RoomRates';

const amenityIcons: { [key: string]: React.ReactNode } = {
  "Wi-Fi": <Wifi className="w-4 h-4" />,
  "Parking": <ParkingSquare className="w-4 h-4" />,
  "Restaurant": <Utensils className="w-4 h-4" />,
  "Television": <Tv className="w-4 h-4" />,
  "Air conditioning": <Wind className="w-4 h-4" />,
};

export default function HotelDetailsPage({ params }: { params: { hotelId: string } }) {
  const { hotelId } = params;
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (hotelId) {
      const fetchHotelDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`/api/hotel/${hotelId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch hotel details.');
          }
          const data = await response.json();
          setHotel(data.data || data); // updated line
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchHotelDetails();
    }
  }, [hotelId]);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<Star key={i} className="w-5 h-5 text-accent fill-accent" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-8 w-1/4 mb-4" />
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-24 w-full mb-4" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto max-w-7xl px-6 py-12 text-destructive">{error}</div>;
  }

  if (!hotel) {
    return <div className="container mx-auto max-w-7xl px-6 py-12">Hotel not found.</div>;
  }

  const mapSrc =
    googleMapsApiKey && hotel.latitude && hotel.longitude
      ? `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${hotel.latitude},${hotel.longitude}`
      : '';

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold">{hotel.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          {renderStars(hotel.stars)}
          <span className="text-muted-foreground">{hotel.stars} Stars</span>
        </div>
        <p className="text-lg text-muted-foreground mt-1 flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {hotel.address}, {hotel.city}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <Carousel className="w-full">
            <CarouselContent>
              {hotel.photos && hotel.photos.length > 0 ? (
                hotel.photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[400px] w-full">
                      <Image
                        src={photo}
                        alt={`${hotel.name} view ${index + 1}`}
                        fill
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem>
                  <div className="relative h-[400px] w-full bg-secondary rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">No images available</p>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">About this hotel</h2>
            <p className="text-muted-foreground leading-relaxed">
              {hotel.description || "No description available."}
            </p>
          </div>

          {hotel.amenities && hotel.amenities.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-4">
                {hotel.amenities.map((amenity) => (
                  <Badge key={amenity.code} variant="secondary" className="flex items-center gap-2 py-2 px-3">
                    {amenityIcons[amenity.name] || <Star className="w-4 h-4" />}
                    <span>{amenity.name}</span>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {hotel.accessibilityAttributes && hotel.accessibilityAttributes.attributes.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
              <div className="grid grid-cols-2 gap-4">
                {hotel.accessibilityAttributes.attributes.map((attr, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-muted-foreground">
                      {attr.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-lg sticky top-24">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              {mapSrc ? (
                <iframe
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={mapSrc}
                ></iframe>
              ) : (
                <div className="h-[300px] bg-secondary flex items-center justify-center rounded-lg">
                  <p className="text-muted-foreground text-center p-4">
                    Map preview is unavailable. Please ensure your Google Maps API key is set up.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg mt-8">
            <CardHeader>
              <CardTitle>Book Your Stay</CardTitle>
              <CardDescription>Select dates to see prices and book.</CardDescription>
            </CardHeader>
            <CardContent>
              <RoomRates hotel={hotel} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
