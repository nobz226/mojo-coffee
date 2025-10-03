"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function ProductsPage() {
  const products = useQuery(api.products.list);

  if (!products) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <Link href="/" className="text-blue-600 mb-4 inline-block">
        ← Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">All Products</h1>

      {products.length === 0 ? (
        <div className="border-2 border-dashed p-12 text-center">
          <p className="mb-4">No products yet. Run the seed command:</p>
          <code className="bg-gray-100 p-2">npx convex run seedProducts:seed</code>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

