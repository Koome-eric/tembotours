# **App Name**: Tembo Tours

## Core Features:

- User Authentication and Authorization: Secure user signup, login using Clerk (email/password, Google, social login). Role-based access control (Admin/Customer).
- Flight Booking: Integration with Lite API for flight search, filters (destination, date, price, airline), booking details summary, and Stripe/PayPal payment integration.
- Hotel Booking: Integration with Lite API for hotel search, filters (location, star rating, price range, amenities), hotel details page with gallery and booking button, and payment integration.
- Visa Processing: Dynamic visa application form with file upload (PDF, image), submission to Firestore for admin review.
- Airport Transfers: Booking form for pickup, drop-off, date, time, vehicle type. Displays confirmation details
- Events and Logistics: Showcase of events and logistics services with enquiry form. LLM powered tool that suggests logistics personnel depending on client profile.
- Admin Dashboard: Manage users, bookings, visa applications, view revenue, active bookings, and analytics charts.

## Style Guidelines:

- Primary color: Navy blue (#192A56) for a luxurious and professional feel.
- Background color: Very light gray (#F0F4F8), a desaturated tint of the primary color, to provide a clean backdrop that allows the content and primary color to stand out.
- Accent color: Gold (#D4AF37) for highlights, CTAs, and a luxurious feel. Complementary to the primary color, but significantly different in brightness and saturation for contrast.
- Body and headline font: 'Poppins', a geometric sans-serif font providing a precise and contemporary feel. Note: currently only Google Fonts are supported.
- Use elegant, minimalist icons to represent different services and categories.
- Full-width hero images, soft shadows, and glassmorphism touches to create a modern and luxurious travel feel.
- Smooth fade-in/out and scroll animations using Framer Motion for a polished user experience.