import { EventHero } from "@/components/events/EventHero";
import { AboutEventServices } from "@/components/events/AboutEventServices";
import { EventTypes } from "@/components/events/EventTypes";
import { PlanningProcess } from "@/components/events/PlanningProcess";
import { EventGallery } from "@/components/events/EventGallery";
import { EventTestimonials } from "@/components/events/EventTestimonials";
import { EventPricing } from "@/components/events/EventPricing";
import { EventBookingForm } from "@/components/events/EventBookingForm";
import { EventFaq } from "@/components/events/EventFaq";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function EventsPage() {
  return (
    <div className="flex flex-col">
      <EventHero />
      <AboutEventServices />
      <EventTypes />
      <PlanningProcess />
      <EventGallery />
      <EventTestimonials />
      <EventPricing />
      <EventBookingForm />
      <EventFaq />
      <section className="bg-primary text-primary-foreground py-20 text-center">
        <div className="container">
          <h2 className="font-headline text-3xl font-bold">Every great event begins with one conversation.</h2>
          <Button asChild variant="secondary" size="lg" className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact?subject=Free+Event+Consultation">Book a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
