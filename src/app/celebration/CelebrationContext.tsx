"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Ctx = {
  previewing: boolean;
  sent: boolean;
  setPreviewing: (v: boolean) => void;
  setSent: (v: boolean) => void;
};

const CelebrationContext = createContext<Ctx | null>(null);

export function CelebrationProvider({ children }: { children: ReactNode }) {
  const [previewing, setPreviewing] = useState(false);
  const [sent, setSent] = useState(false);
  return (
    <CelebrationContext.Provider value={{ previewing, sent, setPreviewing, setSent }}>
      {children}
    </CelebrationContext.Provider>
  );
}

export function useCelebration() {
  const ctx = useContext(CelebrationContext);
  if (!ctx) throw new Error("useCelebration must be used within CelebrationProvider");
  return ctx;
}