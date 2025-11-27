import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Your gateway to luxury travel in Dubai and beyond.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Services</h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <Link href="/flights" className="text-muted-foreground hover:text-primary">Flights</Link>
              <Link href="/hotels" className="text-muted-foreground hover:text-primary">Hotels</Link>
              <Link href="/visa" className="text-muted-foreground hover:text-primary">Visa Processing</Link>
              <Link href="/events" className="text-muted-foreground hover:text-primary">Events & Logistics</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold">About</h3>
            <nav className="mt-4 flex flex-col space-y-2 text-sm">
              <Link href="/events" className="text-muted-foreground hover:text-primary">About Us</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link>
              <Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link>
              <Link href="/#testimonials" className="text-muted-foreground hover:text-primary">Testimonials</Link>
            </nav>
          </div>
          <div>
            <h3 className="font-semibold">Contact Us</h3>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              <p>123 Luxury Lane, Dubai, UAE</p>
              <p>info@tembotours.com</p>
              <p>+971 5 692 43865</p>
              <p>+254 7 218 62512</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tembo Tours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
