"use client";

import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function WhatsappButton() {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
    >
      <Link href="https://wa.me/971000000000" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <MessageSquare className="h-8 w-8" />
      </Link>
    </Button>
  );
}
