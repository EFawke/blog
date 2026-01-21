"use client"

import React from "react";
import { useUser } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export function AdminOnly({ children, fallback = null }: Props) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;
  if (!isSignedIn) return fallback;

  const role = user?.publicMetadata?.role;
  if (role !== "admin") return fallback;

  return <>{children}</>;
}