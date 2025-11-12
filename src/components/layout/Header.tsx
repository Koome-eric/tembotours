"use client";

import Link from "next/link";
import React from "react";
import { useAuth, UserButton, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Menu, User, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";

export function Header() {
  const { isSignedIn, sessionClaims } = useAuth();
  const pathName = usePathname();
  const isAdmin = sessionClaims?.metadata?.role === "admin";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const mainNav = [
    { title: "Flights", href: "/flights" },
    { title: "Hotels", href: "/hotels" },
    { title: "Visa", href: "/visa" },
    { title: "Events", href: "/events" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center">
        {/* Mobile Nav Trigger and Logo */}
        <div className="flex items-center md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                <Logo />
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {mainNav.map((item) => (
                    <Link 
                      key={item.href} 
                      href={item.href} 
                      className="text-foreground/80" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex md:flex-1">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {mainNav.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  pathName === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Logo (centered) */}
        <div className="flex flex-1 justify-center md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <Logo />
            </Link>
        </div>
        
        <div className="flex items-center justify-end space-x-2 md:flex-initial">
          <nav className="flex items-center gap-1">
             <ThemeToggle />
            <SignedOut>
              <SignInButton>
                <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="ghost" size="icon" aria-label="Admin Dashboard">
                    <Shield className="h-5 w-5 text-accent" />
                  </Button>
                </Link>
              )}
              <Link href="/dashboard">
                <Button variant="ghost" size="icon" aria-label="User Dashboard">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
}
