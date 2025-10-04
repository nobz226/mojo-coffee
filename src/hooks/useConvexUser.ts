"use client";

import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";

export function useConvexUser() {
  const { user: clerkUser } = useUser();
  
  const users = useQuery(
    api.users.getByClerkId,
    clerkUser?.id ? { clerkUserId: clerkUser.id } : "skip"
  );

  return {
    convexUser: users?.[0],
    isLoading: users === undefined,
  };
}