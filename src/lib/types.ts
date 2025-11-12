import type { z } from "zod";
import type { visaApplicationSchema } from "@/lib/schemas";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type MainNavItem = NavItem;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export type VisaApplication = z.infer<typeof visaApplicationSchema>;

export type LogisticsPersonnelInput = {
  clientDetails: string;
  eventRequirements: string;
};

export type DashboardConfig = {
  mainNav: MainNavItem[];
};

export type Country = {
  code: string;
  name: string;
};

export type City = {
  name: string;
  country: string;
};

export type Hotel = {
  id: string;
  name: string;
  city: string;
  address: string;
  latitude?: number;
  longitude?: number;
  stars: number;
  main_photo: string;
  currency: string;
  price: number;
  amenities?: { code: number; name: string }[];
  description?: string;
  photos?: string[];
  accessibilityAttributes?: {
    attributes: string[];
  }
};

export type RoomRate = {
  hotelId: string;
  offers: RateOffer[];
};

export type RateOffer = {
  offerId: string;
  price: {
    total: number;
    currency: string;
  };
  room: {
    type: string;
    typeEstimated: {
      category: string;
      beds: number;
      bedType: string;
    };
    description: string;
  };
  guests: {
    adults: number;
  };
  cancellationPolicy: {
    type: string;
    description: string;
    deadline: string | null;
  };
  boardType: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  imageId: string;
  tags: string[];
  readTime: number; // in minutes
  content: string;
};
