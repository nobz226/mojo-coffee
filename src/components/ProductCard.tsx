"use client";

import Image from "next/image";
import Link from "next/link";
import { Doc } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useConvexUser } from "@/hooks/useConvexUser";
import { useState } from "react";

interface ProductCardProps {
  product: Doc<"products">;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = (product.price / 100).toFixed(2);
  const { convexUser } = useConvexUser();
  const addToCart = useMutation(api.cart.addToCart);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (!convexUser) return;

    setIsAdding(true);
    try {
      await addToCart({
        userId: convexUser._id,
        productId: product._id,
      });
      alert("Added to cart!"); // Simple feedback for now
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="border p-4 hover:shadow-lg transition-shadow">
      <Link href={`/products/${product._id}`}>
        {/* Image */}
        <div className="relative h-48 bg-gray-200 mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content */}
        <h3 className="font-bold text-lg mb-2">{product.name}</h3>

        <div className="flex gap-2 mb-2 text-sm">
          <span className="bg-gray-200 px-2 py-1">{product.origin}</span>
          <span className="bg-gray-200 px-2 py-1">{product.roastType}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">${formattedPrice}</span>
          {product.inStock ? (
            <span className="text-green-600 text-sm">In Stock</span>
          ) : (
            <span className="text-red-600 text-sm">Out of Stock</span>
          )}
        </div>
      </Link>

      {/* Add to Cart Button - Outside Link */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock || isAdding || !convexUser}
        className="w-full bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}