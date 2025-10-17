"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Image from "next/image";
import { use, useState } from "react";
import { useConvexUser } from "@/hooks/useConvexUser";
import ProductCard from "@/components/ProductCard";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: Id<"products"> }>;
}) {
  const { id } = use(params);
  const product = useQuery(api.products.getById, { id });
  const allProducts = useQuery(api.products.list);
  const { convexUser } = useConvexUser();
  const addToCart = useMutation(api.cart.addToCart);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!convexUser || !product) return;

    setIsAdding(true);
    try {
      // Call addToCart multiple times for the desired quantity
      // since the mutation doesn't accept quantity parameter
      for (let i = 0; i < quantity; i++) {
        await addToCart({
          userId: convexUser._id,
          productId: id,
        });
      }
      alert(`Added ${quantity} ${product.name} to cart!`);
      setQuantity(1); // Reset quantity after adding
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  if (!product) {
    return <div className="p-8">Loading...</div>;
  }

  // Get 3 random products for "Popular products" section
  const popularProducts = allProducts
    ?.filter(p => p._id !== id)
    .slice(0, 3) || [];

  const formattedPrice = (product.price / 100).toFixed(2);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Products Header with underline */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold inline-block border-b-4 border-black pb-2">
          Products
        </h1>
      </div>

      {/* Filter Section */}
      <div className="mb-12 flex flex-wrap gap-4 items-center">
        <button className="px-6 py-2 bg-[#8B9D83] text-white rounded hover:bg-[#7a8a72]">
          Product Types
        </button>
        <button className="px-6 py-2 bg-[#8B9D83] text-white rounded hover:bg-[#7a8a72]">
          Dietary Preferences
        </button>
        <button className="px-6 py-2 bg-[#8B9D83] text-white rounded hover:bg-[#7a8a72]">
          Submit
        </button>
        <div className="ml-auto flex gap-2">
          <input
            type="text"
            placeholder=""
            className="px-4 py-2 border-2 border-gray-300 rounded bg-[#F5E6D3] w-64"
          />
          <button className="px-6 py-2 bg-[#8B9D83] text-white rounded hover:bg-[#7a8a72]">
            Search
          </button>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-200 rounded">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded"
            priority
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold mb-6">{product.name}</h2>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-semibold">Quantity:</span>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center hover:bg-gray-100"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-16 text-center border-2 border-gray-300 rounded py-1"
              min="1"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
          </div>

          {/* Size Selection */}
          <div className="mb-8">
            <span className="font-semibold mr-4">Size</span>
            <div className="inline-flex gap-2 mt-2">
              {["Small", "Medium", "Large"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 border-2 rounded ${
                    selectedSize === size
                      ? "border-black bg-gray-100"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              {product.description}
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-semibold">Origin:</span> {product.origin}</p>
              <p><span className="font-semibold">Roast:</span> {product.roastType}</p>
              <p><span className="font-semibold">Price:</span> ${formattedPrice}</p>
              {(product.dietaryProfile.nonDairy || product.dietaryProfile.glutenFree) && (
                <p>
                  <span className="font-semibold">Dietary:</span>{" "}
                  {product.dietaryProfile.nonDairy && "Non-Dairy"}
                  {product.dietaryProfile.nonDairy && product.dietaryProfile.glutenFree && ", "}
                  {product.dietaryProfile.glutenFree && "Gluten Free"}
                </p>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding || !convexUser}
            className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed self-start"
          >
            {!product.inStock ? "Out of Stock" : isAdding ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </div>

      {/* Popular Products Section */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold mb-8">Popular products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Footer Slogan Section */}
      <div className="mt-20 py-16 bg-[#E8D5C4] text-center rounded">
        <h2 className="text-xl md:text-2xl text-gray-700 font-medium mb-6 px-4 leading-relaxed">
          Slogan: Lorem ipsum dolor sit amet, consectetur<br />
          adipiscing elit. Mauris vel augue placerat, interdum<br />
          sapien
        </h2>
        <button className="px-12 py-3 border-2 border-gray-600 text-gray-700 rounded hover:bg-gray-100">
          [BUTTON]
        </button>
      </div>
    </div>
  );
}