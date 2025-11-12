"use client";

import Image from "next/image";

export function Logo() {
  return (
    <div className="relative w-[200px] h-[100px]">
      {/* Light mode logo */}
      <Image
        src="/images/logo-light.png"
        alt="Tembo Tours Logo"
        fill
        className="block dark:hidden object-contain"
      />

      {/* Dark mode logo */}
      <Image
        src="/images/logo-dark.png"
        alt="Tembo Tours Logo"
        fill
        className="hidden dark:block object-contain"
      />
    </div>
  );
}
