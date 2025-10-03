"use client";

import Image from "next/image";
import Link from "next/link";
import { Doc } from "../../convex/_generated/dataModel";

interface ProductCardProps {
  product: Doc<"products">;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = (product.price / 100).toFixed(2);

  return (
    <Link href={`/products/${product._id}`}>
      <div className="border p-4 hover:shadow-lg">
        <div className="relative aspect-square mb-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <h3 className="font-bold text-lg">{product.name}</h3>
        
        <div className="flex gap-2 mt-2 text-sm">
          <span className="bg-gray-200 px-2 py-1">{product.origin}</span>
          <span className="bg-gray-200 px-2 py-1">{product.roastType}</span>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <span className="text-xl font-bold">${formattedPrice}</span>
          {product.inStock ? (
            <span className="text-green-600 text-sm">In Stock</span>
          ) : (
            <span className="text-red-600 text-sm">Out of Stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}