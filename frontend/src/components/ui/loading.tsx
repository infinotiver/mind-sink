import { Spinner } from "@/components/ui/spinner";
import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Loading({
  message = "Loading…",
  size = "md",
  className = "",
}: LoadingProps) {
  const sizeClass =
    size === "sm" ? "h-6 w-6" : size === "lg" ? "h-12 w-12" : "h-8 w-8";
  return (
    <div
      className={`min-h-[40vh] flex flex-col items-center justify-center gap-4 ${className}`}
      role="status"
      aria-live="polite"
    >
      <Spinner className={sizeClass} />
      <div className="text-sm text-muted-foreground">{message}</div>
    </div>
  );
}
