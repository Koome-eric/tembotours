"use client";

import Link from "next/link";
import React from "react";
import {
  useUser,
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Menu, User, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../ThemeToggle";

export function Header() {
  const { user, isLoaded } = useUser();
  const pathName = usePathname();
  const isAdmin = user?.publicMetadata?.role === "admin";

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
      <div className="flex items-center justify-between h-16 w-full px-4 sm:px-6 lg:px-8 max-w-full mx-auto">
        {/* Mobile Menu Trigger */}
        <div className="flex items-center md:hidden flex-shrink-0">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full sm:max-w-sm overflow-y-auto"
            >
              <Link
                href="/"
                className="flex items-center py-4 px-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Logo />
              </Link>
              <nav className="flex flex-col py-4 px-4 space-y-3">
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
                {/* Sign In / Sign Up in mobile menu */}
                <SignedOut>
                  <SignInButton>
                    <Button
                      variant="ghost"
                      className="w-full mt-2 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button
                      className="w-full mt-1 text-center"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  {isLoaded && isAdmin && (
                    <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-center">
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-center">
                      Dashboard
                    </Button>
                  </Link>
                  <UserButton
                    afterSignOutUrl="/"
                    className="w-full mt-1 justify-center"
                  />
                </SignedIn>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo (always centered) */}
        <div className="flex-1 flex justify-center md:justify-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Right Side: Theme Toggle + Desktop Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Theme toggle is always visible */}
          <ThemeToggle />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
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

            <SignedOut>
              <SignInButton>
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton>
                <Button>Sign Up</Button>
              </SignUpButton>
            </SignedOut>

            <SignedIn>
              {isLoaded && isAdmin && (
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
