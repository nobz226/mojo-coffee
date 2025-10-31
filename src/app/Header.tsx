"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexUser } from "@/hooks/useConvexUser";

export default function Header() {
  const { convexUser } = useConvexUser();
  const cart = useQuery(
    api.cart.getUserCart,
    convexUser ? { userId: convexUser._id } : "skip"
  );

  const itemCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="bg-[#3C2C25] text-white">
      <nav className="container mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/mojo-logo-white.svg"
            alt="Mojo Coffee"
            width={120}
            height={60}
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-300 hover:text-white transition"
          >
            About Us
          </Link>
          <Link
            href="/products"
            className="text-gray-300 hover:text-white transition"
          >
            Products
          </Link>
          <Link
            href="/cart"
            className="text-gray-300 hover:text-white transition relative"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <Link
            href="/profile"
            className="text-gray-300 hover:text-white transition"
          >
            Profile
          </Link>

          {/* Order Ahead Button */}
          <Link
            href="/products"
            className="px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black transition rounded"
          >
            Order Ahead
          </Link>

          {/* Login Button (UserButton replacement wrapper) */}
          <div className="px-6 py-2 transition rounded flex items-center justify-center min-w-[80px]">
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </nav>
    </header>
  );
}