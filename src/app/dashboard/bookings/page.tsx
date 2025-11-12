import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function BookingsPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
        <Button asChild>
            <Link href="/"><Plus className="mr-2 h-4 w-4"/> New Booking</Link>
        </Button>
      </div>
      <p className="text-muted-foreground">View and manage your flight, hotel, and event bookings.</p>
      
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>No Bookings Yet</CardTitle>
            <CardDescription>You haven&apos;t made any bookings. When you do, they will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
                <p>Start planning your next trip!</p>
                 <div className="mt-4 flex justify-center gap-4">
                    <Button asChild>
                        <Link href="/flights">Book a Flight</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/hotels">Book a Hotel</Link>
                    </Button>
                 </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
