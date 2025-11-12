"use client";

import * as React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

type Toast = {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
};

type ToasterToast = Toast & {
  variant?: "default" | "destructive";
  type?: "success" | "info" | "warning" | "error";
};

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      richColors
      closeButton
      duration={4000}
    />
  );
}

export function useToast() {
  return {
    toast: ({
      title,
      description,
      action,
      variant,
      type = "success",
      ...props
    }: ToasterToast) => {
      const toastType =
        variant === "destructive" ? "error" : (type as keyof typeof sonnerToast);

      // @ts-ignore – Sonner exposes success/info/warning/error dynamically
      sonnerToast[toastType](title ?? "", {
        description,
        action,
        ...props,
      });
    },
  };
}
