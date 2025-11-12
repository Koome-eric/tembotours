"use client";

import { useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Hotel, Search } from "lucide-react";
import { Combobox } from '@/components/ui/combobox';
import type { City } from '@/lib/types';

export default function HotelsPage() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [citySearch, setCitySearch] = useState('');


  useEffect(() => {
    if (citySearch.length < 3) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      setLoadingCities(true);
      try {
        const response = await fetch(`/api/cities?cityName=${citySearch}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cities');
        }
        const data = await response.json();
        setCities(data.data || []);
      } catch (error) {
        console.error(error);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    const debounce = setTimeout(fetchCities, 300);
    return () => clearTimeout(debounce);

  }, [citySearch]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const checkIn = formData.get('check-in') as string;
    const checkOut = formData.get('check-out') as string;
    const guests = formData.get('guests') as string;
    
    const params = new URLSearchParams();
    if (selectedCity) params.set('destination', selectedCity);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);
    
    router.push(`/hotels/search?${params.toString()}`);
  };

  const cityOptions = useMemo(() => cities.map(city => ({
    value: city.name,
    label: `${city.name}, ${city.country}`
  })), [cities]);

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold">Discover Your Perfect Stay</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find and book luxury hotels.</p>
      </header>

      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><Hotel className="mr-2 h-5 w-5"/>Hotel Search</CardTitle>
          <CardDescription>Find the perfect hotel for your stay.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSearch}>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="col-span-1 sm:col-span-2 space-y-2">
                <Label htmlFor="city">City</Label>
                <Combobox
                  options={cityOptions}
                  value={selectedCity}
                  onChange={(value) => {
                    setSelectedCity(value);
                    setCitySearch(value);
                  }}
                  onInputChange={setCitySearch}
                  placeholder={loadingCities ? "Loading cities..." : "Enter a city name"}
                  searchPlaceholder="Search city (min. 3 characters)..."
                  notFoundText="No city found."
                  disabled={false}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-in">Check-in Date</Label>
                <Input id="check-in" name="check-in" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="check-out">Check-out Date</Label>
                <Input id="check-out" name="check-out" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <Input id="guests" name="guests" type="number" min="1" placeholder="2" defaultValue="2"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rating">Star Rating</Label>
                <Select name="rating">
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rating</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars & up</SelectItem>
                    <SelectItem value="3">3 Stars & up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={!selectedCity}>
              <Search className="mr-2 h-4 w-4"/> Search Hotels
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
