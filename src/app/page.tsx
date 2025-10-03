"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const products = useQuery(api.products.list);

  if (!products) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Mojo Coffee Shop</h1>
        
        {/* Filter Section - Simple placeholders for now */}
        <div className="flex gap-4 mb-6">
          <button className="border px-4 py-2">Product Types</button>
          <button className="border px-4 py-2">Dietary Preferences</button>
          <button className="border px-4 py-2">Submit</button>
          <div className="ml-auto flex gap-2">
            <input 
              type="text" 
              placeholder="Search..." 
              className="border px-4 py-2"
            />
            <button className="border px-4 py-2">Search</button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
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

      {/* Pagination Placeholder */}
      <div className="flex justify-center gap-2 mt-8">
        <button className="border px-4 py-2">1</button>
        <button className="border px-4 py-2">2</button>
        <button className="border px-4 py-2">3</button>
        <button className="border px-4 py-2">More</button>
      </div>
    </div>
  );
}

