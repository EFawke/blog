"use client";
import { ReactNode } from "react";
import { useCelebration } from "./CelebrationContext";

export function RevealLayer({ children }: { children: ReactNode }) {
  const { previewing, sent } = useCelebration();
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: sent ? 50 : 0,
        pointerEvents: "none",
        opacity: sent ? 1 : previewing ? 0.05 : 0,
        transform: sent ? "scale(1)" : "scale(1.04)",
        transition: "opacity .6s ease, transform .9s ease",
      }}
    >
      {children}
    </div>
  );
}