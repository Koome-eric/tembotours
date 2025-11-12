import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: AdminLayoutProps) {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata?.role !== 'admin') {
    redirect('/dashboard');
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
