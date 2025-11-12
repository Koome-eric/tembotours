# Tembo Tours

This is a Next.js web application for Tembo Tours, a Dubai-based travel company.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root of the project and add the following environment variables. You can get these from the respective service dashboards.

```
# Clerk Authentication
# Get these from your Clerk dashboard
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Google Maps API Key (for contact page)
# Get this from Google Cloud Console
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Lite API Key (for hotel/flight search)
LITE_API_KEY=
```

### Clerk User Roles

This application uses role-based access control. To create an admin user, go to your Clerk dashboard, navigate to the user, and in the "Public Metadata" section, add the following JSON:

```json
{
  "role": "admin"
}
```

Regular users do not need any public metadata.

### Running the Development Server

Once the setup is complete, you can run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Core Features

- **User Authentication:** Secure user signup/login with Clerk.
- **Flight & Hotel Booking:** Mock integration for searching and booking.
- **Visa Processing:** A dynamic form with AI-powered document analysis.
- **Airport Transfers:** A simple booking form.
- **Events & Logistics:** Service showcase with an AI-powered personnel suggestion tool.
- **Dashboards:** Separate dashboards for users and admins.
