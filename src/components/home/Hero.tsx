"use client";

import { useEffect, useState } from "react";
import { SearchWidget } from "./SearchWidget";

export function Hero() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <section className="relative w-full flex flex-col justify-center items-center overflow-hidden min-h-[500px] sm:min-h-[600px] md:min-h-[650px] lg:min-h-[700px] pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/safari2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        <h1 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug md:leading-tight">
          Discover. Explore. Experience the World.
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl">
          From visa processing and flight booking to hotels and event logistics — your journey starts here.
        </p>
      </div>

      {/* Search Widget */}
      <div className="relative z-20 mt-6 sm:mt-8 w-full max-w-md sm:max-w-3xl md:max-w-4xl px-4 sm:px-6 lg:px-8">
        <SearchWidget />
      </div>
    </section>
  );
}
