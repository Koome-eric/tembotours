'use client';

import { useState, useEffect } from 'react';
import type { Hotel, RoomRate, RateOffer } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2, BedDouble, User, Wallet } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface RoomRatesProps {
  hotel: Hotel;
}

export function RoomRates({ hotel }: RoomRatesProps) {
  const [offers, setOffers] = useState<RateOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<RateOffer | null>(null);

  const [checkin, setCheckin] = useState(new Date().toISOString().split('T')[0]);
  const [checkout, setCheckout] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState('2');

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    setOffers([]);
    setSelectedOffer(null);
    
    try {
      const params = new URLSearchParams({
        hotelId: hotel.id,
        checkin: checkin,
        checkout: checkout,
        guests: guests,
        currency: 'USD',
      });

      const response = await fetch(`/api/hotels/rates?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch room rates.');
      }
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setOffers(data.data[0].offers);
      } else {
        setError("No rooms found for the selected criteria.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToBook = () => {
    if (!selectedOffer) return;
    // Next step will be implemented here
    console.log("Proceeding to book offer:", selectedOffer.offerId);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          Check Room Rates
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Check Room Rates</DialogTitle>
          <DialogDescription>
            Select dates and guests to find available rooms for {hotel.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="checkin">Check-in</Label>
            <Input id="checkin" type="date" value={checkin} onChange={(e) => setCheckin(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkout">Check-out</Label>
            <Input id="checkout" type="date" value={checkout} onChange={(e) => setCheckout(e.target.value)} />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="guests">Guests</Label>
            <Select onValueChange={setGuests} defaultValue={guests}>
              <SelectTrigger>
                <SelectValue placeholder="Select number of guests" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(4)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>{i + 1} Guest(s)</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={fetchRates} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Find Rooms
          </Button>
        </DialogFooter>

        {error && <p className="text-destructive mt-4">{error}</p>}

        {offers.length > 0 && (
          <div className="mt-6 max-h-[40vh] overflow-y-auto pr-2 space-y-4">
            <h3 className="text-lg font-semibold">Available Rooms</h3>
            {offers.map((offer) => (
              <Card 
                key={offer.offerId} 
                className={`cursor-pointer transition-all ${selectedOffer?.offerId === offer.offerId ? 'border-primary ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedOffer(offer)}
              >
                <CardHeader>
                  <CardTitle className='text-xl'>{offer.room.typeEstimated.category}</CardTitle>
                  <CardDescription>{offer.room.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BedDouble className="w-4 h-4" /> 
                    <span>{offer.room.typeEstimated.bedType} bed</span>
                    <User className="w-4 h-4 ml-2" />
                    <span>Sleeps {offer.guests.adults}</span>
                  </div>
                  {offer.cancellationPolicy.description && (
                    <p className="text-green-600">{offer.cancellationPolicy.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Total Price</p>
                      <p className="text-lg font-bold">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: offer.price.currency }).format(offer.price.total)}
                      </p>
                    </div>
                    {offer.boardType && <Badge variant="outline">{offer.boardType}</Badge>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedOffer && (
          <DialogFooter className="mt-4">
            <Button className="w-full" onClick={handleProceedToBook}>
              <Wallet className="mr-2 h-4 w-4" /> Proceed to Book
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
