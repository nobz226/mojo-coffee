"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";

export default function ProductsPage() {
  const products = useQuery(api.products.list);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoastType, setSelectedRoastType] = useState("");
  const [selectedDietary, setSelectedDietary] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter products based on search and filter criteria
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      // Search filter (by name and description)
      const matchesSearch = searchQuery === "" || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase());

      // Roast type filter
      const matchesRoastType = selectedRoastType === "" || 
        product.roastType === selectedRoastType;

      // Dietary filter
      const matchesDietary = selectedDietary === "" || 
        (selectedDietary === "nonDairy" && product.dietaryProfile.nonDairy) ||
        (selectedDietary === "glutenFree" && product.dietaryProfile.glutenFree);

      return matchesSearch && matchesRoastType && matchesDietary;
    });
  }, [products, searchQuery, selectedRoastType, selectedDietary]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRoastType, selectedDietary]);

  // Reset all filters
  const handleReset = () => {
    setSelectedRoastType("");
    setSelectedDietary("");
    setSearchQuery("");
    setCurrentPage(1);
  };

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
          <option value="">All Roast Types</option>
          <option value="Light">Light Roast</option>
          <option value="Medium">Medium Roast</option>
          <option value="Dark">Dark Roast</option>
        </select>

        <select 
          className="px-4 py-2 border rounded bg-[#8B9D83] text-white"
          value={selectedDietary}
          onChange={(e) => setSelectedDietary(e.target.value)}
        >
          <option value="">All Dietary Preferences</option>
          <option value="nonDairy">Non-Dairy</option>
          <option value="glutenFree">Gluten Free</option>
        </select>

        <button 
          className="px-6 py-2 bg-[#8B9D83] text-white rounded hover:bg-[#7a8a72]"
          onClick={handleReset}
        >
          Reset Filters
        </button>

        <div className="ml-auto flex gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 border rounded bg-[#F5E6D3]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="px-6 py-2 bg-[#8B9D83] text-white rounded hover:bg-[#7a8a72]"
            onClick={() => {}}
          >
            Search
          </button>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-gray-600">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
        {(searchQuery || selectedRoastType || selectedDietary) && (
          <button 
            onClick={handleReset}
            className="ml-4 text-blue-600 hover:underline text-sm"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="border-2 border-dashed p-12 text-center">
          <p className="text-gray-600 mb-2">No products match your filters</p>
          <button 
            onClick={handleReset}
            className="text-blue-600 hover:underline"
          >
            Clear filters to see all products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-8">
          <button 
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button 
              key={page}
              className={`px-4 py-2 border rounded hover:bg-gray-100 ${
                currentPage === page ? 'bg-[#8B9D83] text-white' : ''
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Newsletter Section - Full Width */}
      <section className="py-20 px-4 bg-[#8B9D83] -mx-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get new updates and discount offers, Sign up now!
              </h2>
              <p className="text-gray-100 mb-8 leading-relaxed">
                Be part of something special. Subscribe to Mojo Coffee Blend for
                early access to new blends, exclusive discounts, and
                behind-the-scenes stories from our roasters and baristas. We love
                sharing our journey and connecting with those who share our passion
                for coffee, culture, and sustainability.
              </p>
              <form className="bg-white rounded-lg p-2 flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border-none focus:outline-none rounded"
                />
                <button
                  type="submit"
                  className="bg-[#4A3933] text-white px-8 py-3 rounded hover:bg-[#3a2923] transition-colors font-semibold whitespace-nowrap"
                >
                  Keep Me Alerted
                </button>
              </form>
            </div>

            <div className="flex justify-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src="/updates2.png"
                  alt="Coffee"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

