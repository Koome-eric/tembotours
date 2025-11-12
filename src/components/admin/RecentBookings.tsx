import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const bookings = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        service: "Flight",
        amount: "$1,250.00",
        status: "Confirmed",
        date: "2023-11-20"
    },
    {
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        service: "Hotel",
        amount: "$850.00",
        status: "Pending",
        date: "2023-11-19"
    },
    {
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        service: "Visa",
        amount: "$150.00",
        status: "Confirmed",
        date: "2023-11-18"
    },
    {
        name: "William Kim",
        email: "will@email.com",
        service: "Transfer",
        amount: "$75.00",
        status: "Completed",
        date: "2023-11-17"
    },
];

export function RecentBookings() {
  return (
    <Card className="mt-8">
        <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>A list of the most recent bookings.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map((booking) => (
                        <TableRow key={booking.email}>
                            <TableCell>
                                <div className="font-medium">{booking.name}</div>
                                <div className="text-sm text-muted-foreground">{booking.email}</div>
                            </TableCell>
                            <TableCell>{booking.service}</TableCell>
                            <TableCell>
                                <Badge variant={booking.status === 'Confirmed' ? 'default' : booking.status === 'Pending' ? 'secondary' : 'outline'}>
                                    {booking.status}
                                </Badge>
                            </TableCell>
                             <TableCell>{booking.date}</TableCell>
                            <TableCell className="text-right">{booking.amount}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
  )
}
