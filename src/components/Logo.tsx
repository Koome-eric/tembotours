import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 250 60"
      width="150"
      height="36"
      className={cn("text-primary dark:text-accent", props.className)}
      {...props}
    >
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" transform="translate(10, 0) scale(0.9)">
        {/* Elephant Icon */}
        <path d="M45.9,24.4C45.9,14.2,37.6,6,27.4,6c-8.8,0-16.2,6.1-18.1,14.3"/>
        <path d="M52.9,36.5c-2.3,6.3-8.4,10.6-15.5,10.6c-9.2,0-16.7-7.5-16.7-16.7c0-4.4,1.7-8.5,4.5-11.5"/>
        <path d="M45.9,24.4h11.3c2.2,0,4,1.8,4,4v8.3c0,2.2-1.8,4-4,4h-2.1"/>
        <path d="M19.4,36.5c-5.2,0-9.4-4.2-9.4-9.4c0-4.1,2.6-7.6,6.3-8.8"/>
        <path d="M32.5,47.1c-2.6,3.9-4.2,8.6-4.2,13.6"/>
        <path d="M28.3,60.7c3.9,0,7-3.1,7-7"/>
        <path d="M25,29h15"/>
        <path d="M23,35h17"/>
        <path d="M25,41h15"/>
        <circle cx="48" cy="18" r="1"/>
      </g>
      <text
        x="120"
        y="26"
        fontFamily="Poppins, sans-serif"
        fontSize="20"
        fontWeight="600"
        fill="currentColor"
      >
        TEMBO
      </text>
      <text
        x="120"
        y="50"
        fontFamily="Poppins, sans-serif"
        fontSize="20"
        fontWeight="400"
        fill="currentColor"
      >
        TOURS
      </text>
    </svg>
  );
}
