"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useState } from "react";

export default function ProductsPage() {
  const products = useQuery(api.products.list);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoastType, setSelectedRoastType] = useState("");
  const [selectedDietary, setSelectedDietary] = useState("");

  if (!products) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <Link href="/" className="text-blue-600 mb-4 inline-block">
        ← Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Filter Section */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        <select 
          className="px-4 py-2 border rounded bg-[#8B9D83] text-white"
          value={selectedRoastType}
          onChange={(e) => setSelectedRoastType(e.target.value)}
        >
          <option value="">Product Types</option>
          <option value="Light">Light Roast</option>
          <option value="Medium">Medium Roast</option>
          <option value="Dark">Dark Roast</option>
        </select>

        <select 
          className="px-4 py-2 border rounded bg-[#8B9D83] text-white"
          value={selectedDietary}
          onChange={(e) => setSelectedDietary(e.target.value)}
        >
          <option value="">Dietary Preferences</option>
          <option value="nonDairy">Non-Dairy</option>
          <option value="glutenFree">Gluten Free</option>
        </select>

        <button 
          className="px-6 py-2 bg-[#8B9D83] text-white rounded hover:bg-[#7a8a72]"
          onClick={() => {
            setSelectedRoastType("");
            setSelectedDietary("");
            setSearchQuery("");
          }}
        >
          Submit
        </button>

        <div className="ml-auto flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border rounded bg-[#F5E6D3]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="px-6 py-2 bg-[#8B9D83] text-white rounded hover:bg-[#7a8a72]">
            Search
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="border-2 border-dashed p-12 text-center">
          <p className="mb-4">No products yet. Run the seed command:</p>
          <code className="bg-gray-100 p-2">npx convex run seedProducts:seed</code>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="flex justify-center items-center gap-2 mb-8">
          <button className="px-4 py-2 border rounded hover:bg-gray-100">
            1
          </button>
          <button className="px-4 py-2 border rounded hover:bg-gray-100">
            2
          </button>
          <button className="px-4 py-2 border rounded hover:bg-gray-100">
            3
          </button>
          <span className="px-2">...</span>
          <button className="px-4 py-2 border rounded hover:bg-gray-100">
            More
          </button>
        </div>
      )}

      {/* Footer Slogan Section */}
      <div className="mt-16 py-12 bg-[#E8D5C4] text-center rounded">
        <h2 className="text-xl md:text-2xl text-gray-700 font-medium mb-6 px-4">
          Slogan: Lorem ipsum dolor sit amet, consectetur<br />
          adipiscing elit. Mauris vel augue placerat, interdum<br />
          sapien
        </h2>
        <button className="px-8 py-3 border-2 border-gray-600 text-gray-700 rounded hover:bg-gray-100">
          [BUTTON]
        </button>
      </div>
    </div>
  );
}

