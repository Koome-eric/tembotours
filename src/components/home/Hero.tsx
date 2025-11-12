"use client";

import { useEffect, useState } from "react";
import { SearchWidget } from "./SearchWidget";

export function Hero() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <section className="relative h-[600px] md:h-[650px] w-full flex flex-col justify-center items-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        {/* 👇 Local video path */}
        <source src="/videos/safari.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 pt-16">
        <h1 className="font-headline text-4xl font-bold md:text-6xl">
          Discover. Explore. Experience the World.
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl">
          From visa processing and flight booking to hotels and event logistics — your journey starts here.
        </p>
      </div>

      {/* Search Widget */}
      <div className="relative z-20 mt-8 w-full max-w-4xl px-4">
        <SearchWidget />
      </div>
    </section>
  );
}
