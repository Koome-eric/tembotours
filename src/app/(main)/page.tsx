import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { VisaAssistance } from "@/components/home/VisaAssistance";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { EventsAndExperiences } from "@/components/home/EventsAndExperiences";
import { BlogSection } from "@/components/home/BlogSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Services />
      <FeaturedDestinations />
      <VisaAssistance />
      <SpecialOffers />
      <EventsAndExperiences />
      <BlogSection />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
