"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerkRole } from "@/hooks/use-clerk-role";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Calendar,
  Settings,
  Shield,
  Users,
  Briefcase,
  FileText,
  LogOut,
  Home,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { isAdmin } = useClerkRole();
  const { user } = useUser();

  const userNav = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Bookings", href: "/dashboard/bookings", icon: Calendar },
    { title: "Profile", href: "/dashboard/profile", icon: Settings },
  ];

  const adminNav = [
    { title: "Overview", href: "/admin", icon: Shield },
    { title: "Users", href: "/admin/users", icon: Users },
    { title: "Bookings", href: "/admin/bookings", icon: Briefcase },
    { title: "Visa Apps", href: "/admin/visa-applications", icon: FileText },
  ];
  
  const navItems = isAdmin ? [...adminNav, ...userNav] : userNav;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between">
              <Link href="/">
                <Logo />
              </Link>
              <SidebarTrigger />
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2 p-2">
              <UserButton />
              <div className="flex flex-col truncate">
                <span className="font-semibold text-sm">{user?.fullName}</span>
                <span className="text-xs text-muted-foreground">{isAdmin ? "Admin" : "Customer"}</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
