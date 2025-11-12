import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plane, Search } from "lucide-react";

export default function FlightsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold">Find Your Next Flight</h1>
        <p className="mt-2 text-lg text-muted-foreground">Search and book flights with ease. Lite API integration coming soon.</p>
      </header>

      <Card className="mx-auto max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center"><Plane className="mr-2 h-5 w-5"/>Flight Search</CardTitle>
          <CardDescription>Enter your travel details to find the best flights.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input id="from" placeholder="e.g., New York (JFK)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input id="to" placeholder="e.g., Dubai (DXB)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="departure">Departure Date</Label>
              <Input id="departure" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="return">Return Date (Optional)</Label>
              <Input id="return" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passengers">Passengers</Label>
              <Input id="passengers" type="number" min="1" placeholder="1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="airline">Preferred Airline</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any Airline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emirates">Emirates</SelectItem>
                  <SelectItem value="etihad">Etihad Airways</SelectItem>
                  <SelectItem value="qatar">Qatar Airways</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
            <Search className="mr-2 h-4 w-4"/> Search Flights
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
