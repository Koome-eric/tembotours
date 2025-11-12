"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plane, Hotel, FileText, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Combobox } from "../ui/combobox";
import type { City } from "@/lib/types";

export function SearchWidget() {
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

  const handleHotelSearch = (event: React.FormEvent<HTMLFormElement>) => {
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
  
    const cityOptions = cities.map(city => ({
        value: city.name,
        label: `${city.name}, ${city.country}`
    }));


  return (
    <Card className="shadow-2xl">
      <CardContent className="p-4">
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
            <TabsTrigger value="flights"><Plane className="mr-2 h-4 w-4 hidden sm:block"/>Flights</TabsTrigger>
            <TabsTrigger value="hotels"><Hotel className="mr-2 h-4 w-4 hidden sm:block"/>Hotels</TabsTrigger>
            <TabsTrigger value="visa"><FileText className="mr-2 h-4 w-4 hidden sm:block"/>Visa</TabsTrigger>
          </TabsList>
          <TabsContent value="flights" className="mt-4">
             <form action="/flights" className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-[2fr_2fr_1fr_auto]">
              <div className="space-y-1">
                <Label htmlFor="from">From</Label>
                <Input id="from" placeholder="e.g., New York" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="to">To</Label>
                <Input id="to" placeholder="e.g., Dubai" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="departure">Departure</Label>
                <Input id="departure" type="date" />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90"><Search className="mr-2 h-4 w-4" />Search</Button>
            </form>
          </TabsContent>
          <TabsContent value="hotels" className="mt-4">
            <form onSubmit={handleHotelSearch} className="grid grid-cols-1 items-end gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto]">
               <div className="space-y-1">
                <Label htmlFor="city">Destination</Label>
                 <Combobox
                  options={cityOptions}
                  value={selectedCity}
                  onChange={(value) => {
                    setSelectedCity(value);
                    setCitySearch(value);
                  }}
                  onInputChange={setCitySearch}
                  placeholder={loadingCities ? "Loading..." : "e.g. Dubai"}
                  searchPlaceholder="Search city..."
                  notFoundText="No city found."
                  disabled={false}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="check-in">Check-in</Label>
                <Input id="check-in" name="check-in" type="date" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="check-out">Check-out</Label>
                <Input id="check-out" name="check-out" type="date" />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90"><Search className="mr-2 h-4 w-4" />Search</Button>
            </form>
          </TabsContent>
          <TabsContent value="visa" className="mt-4">
            <form action="/visa" className="grid grid-cols-1 items-end gap-4 md:grid-cols-[2fr_auto]">
              <div className="space-y-1">
                <Label htmlFor="nationality">Nationality</Label>
                <Input id="nationality" placeholder="e.g., American" />
              </div>
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90"><Search className="mr-2 h-4 w-4" />Check Requirements</Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
