"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
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

