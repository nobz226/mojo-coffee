"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function SyncUser() {
  const { user } = useUser();
  const addUser = useMutation(api.addUser.default);

  useEffect(() => {
    if (user && user.id) {
      addUser({ clerkUserId: user.id });
    }
  }, [user, addUser]);

  return null;
}

