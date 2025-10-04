"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { useConvexUser } from "@/hooks/useConvexUser";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: Id<"products"> }>;
}) {
  const { id } = use(params);
  const product = useQuery(api.products.getById, { id });
  const { convexUser } = useConvexUser();
  const addToCart = useMutation(api.cart.addToCart);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!convexUser) return;

    setIsAdding(true);
    try {
      await addToCart({
        userId: convexUser._id,
        productId: id,
      });
      alert("Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) {
    return <div className="p-8">Loading...</div>;
  }

  const formattedPrice = (product.price / 100).toFixed(2);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-blue-600 mb-4 inline-block">
        ← Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative h-96 bg-gray-200">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex gap-2 mb-4">
            <span className="bg-gray-200 px-3 py-1">{product.origin}</span>
            <span className="bg-gray-200 px-3 py-1">
              {product.roastType} Roast
            </span>
          </div>

          <p className="text-2xl font-bold mb-4">${formattedPrice}</p>

          <p className="mb-6 text-gray-700">{product.description}</p>

          {/* Dietary Info */}
          <div className="mb-6">
            <h3 className="font-bold mb-2">Dietary Information</h3>
            <div className="flex gap-2">
              {product.dietaryProfile.nonDairy && (
                <span className="bg-green-100 px-3 py-1 text-sm">
                  Non-Dairy
                </span>
              )}
              {product.dietaryProfile.glutenFree && (
                <span className="bg-green-100 px-3 py-1 text-sm">
                  Gluten Free
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !convexUser}
              className="bg-blue-600 text-white px-8 py-3 w-full md:w-auto hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isAdding ? "Adding..." : "Add to Cart"}
            </button>
          ) : (
            <button
              disabled
              className="bg-gray-300 text-gray-600 px-8 py-3 w-full md:w-auto cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}

          <p className="text-sm text-gray-600 mt-4">
            {product.inStock
              ? "✓ In stock and ready to ship"
              : "Currently unavailable"}
          </p>
        </div>
      </div>
    </div>
  );
}