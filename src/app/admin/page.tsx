import { Analytics } from "@/components/admin/Analytics";
import { RecentBookings } from "@/components/admin/RecentBookings";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Admin Overview</h1>
      <p className="text-muted-foreground">Welcome to the control center. Monitor all activity here.</p>
      
      <div className="mt-8">
        <Analytics />
        <RecentBookings />
      </div>
    </div>
  );
}
