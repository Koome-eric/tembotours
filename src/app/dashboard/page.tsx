import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Hotel } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
      <p className="text-muted-foreground">Welcome back! Here's a quick overview of your activities.</p>
      
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Trips</CardTitle>
            <CardDescription>You have no upcoming trips.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              <p>Ready for your next adventure?</p>
              <div className="mt-4 flex justify-center gap-4">
                <Button asChild>
                  <Link href="/flights"><Plane className="mr-2 h-4 w-4"/> Book a Flight</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/hotels"><Hotel className="mr-2 h-4 w-4"/> Book a Hotel</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Past Bookings</CardTitle>
            <CardDescription>A history of your travels with us.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              No past bookings found.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
