"use client";

import { useAuth } from "@clerk/nextjs";

export function useClerkRole() {
  const { sessionClaims } = useAuth();
  const role = sessionClaims?.metadata?.role;

  return {
    role,
    isAdmin: role === 'admin',
  };
}
