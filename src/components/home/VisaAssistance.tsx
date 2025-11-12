import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText } from "lucide-react";
import Image from "next/image";

const features = [
  "Online application & document upload",
  "Fast approvals & real-time tracking",
  "Secure payment gateway",
  "Support for multiple countries",
];

export function VisaAssistance() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 text-primary mb-2">
              <FileText className="h-7 w-7" />
              <h2 className="font-headline text-3xl font-bold">
                Hassle-Free Visa Processing
              </h2>
            </div>

            <p className="text-lg text-muted-foreground mt-4">
              Skip embassy queues — Tembo Tours handles the entire visa process
              from start to finish. Whether it’s a Dubai visa, Kenya visa, or a
              visa change request, we’ve got you covered.
            </p>

            <ul className="mt-6 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-8">
              <Link href="/visa">Apply for Visa</Link>
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative h-96 w-full">
            <Image
              src="/images/visa.jpg" // 👈 Make sure this image exists in public/images/
              alt="Visa assistance"
              fill
              className="object-cover rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
