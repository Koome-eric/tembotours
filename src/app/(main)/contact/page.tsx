"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";
import { sendContactEmail } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  );
}

export default function ContactPage() {
  const [state, formAction] = useFormState(sendContactEmail, { message: "" });
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.message,
      });
    }
  }, [state, toast]);

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold">Get In Touch</h1>
        <p className="mt-2 text-lg text-muted-foreground">We&apos;re here to help. Contact us for any inquiries or support.</p>
      </header>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-start">
              <MapPin className="mt-1 h-6 w-6 text-primary" />
              <div className="ml-4">
                <h3 className="font-semibold">Our Office</h3>
                <p className="text-muted-foreground">123 Luxury Lane, Business Bay, Dubai, UAE</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="mt-1 h-6 w-6 text-primary" />
              <div className="ml-4">
                <h3 className="font-semibold">Email Us</h3>
                <p className="text-muted-foreground">info@tembotours.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="mt-1 h-6 w-6 text-primary" />
              <div className="ml-4">
                <h3 className="font-semibold">Call Us</h3>
                <p className="text-muted-foreground">+971 4 123 4567</p>
              </div>
            </div>
          </div>
          <div className="mt-8 h-64 rounded-lg bg-secondary">
             <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                Google Map of Dubai office coming soon.
             </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Send Us a Message</h2>
          <form action={formAction} className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="e.g., Visa Inquiry" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required />
            </div>
            <SubmitButton />
          </form>
        </div>
      </div>
    </div>
  );
}
