"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { useConvexUser } from "@/hooks/useConvexUser";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function CartPage() {
  const { convexUser } = useConvexUser();
  const cartItems = useQuery(
    api.cart.getUserCart,
    convexUser ? { userId: convexUser._id } : "skip"
  );
  const allProducts = useQuery(api.products.list);
  const updateQuantity = useMutation(api.cart.updateQuantity);
  const removeFromCart = useMutation(api.cart.removeFromCart);

  if (!convexUser || !cartItems) {
    return <div className="p-8">Loading cart...</div>;
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);
  const formattedSubtotal = (subtotal / 100).toFixed(2);

  // Get 3 random products for "Popular products" section
  const popularProducts = allProducts?.slice(0, 3) || [];

  const handleQuantityChange = async (cartItemId: Id<"cartItems">, newQuantity: number) => {
    if (newQuantity < 1) return;
    await updateQuantity({ cartItemId, quantity: newQuantity });
  };

  const handleRemove = async (cartItemId: Id<"cartItems">) => {
    await removeFromCart({ cartItemId });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Shopping Bag Header with underline */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold inline-block border-b-4 border-black pb-2">
          Shopping Bag
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Cart Items Section - Left Side (2 columns) */}
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="border-2 border-dashed p-12 text-center">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Link href="/" className="text-blue-600 hover:underline">
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => {
                if (!item.product) return null;

                return (
                  <div key={item._id} className="flex gap-4 pb-6 border-b">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 bg-gray-200 flex-shrink-0 rounded">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{item.product.name}</h3>
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        <p className="mb-1">
                          <span className="font-semibold">Description</span>
                        </p>
                        <p className="text-xs leading-relaxed">
                          {item.product.description}
                        </p>
                      </div>

                      {/* Quantity Controls and EDIT */}
                      <div className="flex items-center gap-4">
                        <button className="text-sm font-semibold underline">
                          EDIT
                        </button>
                        <div className="flex items-center gap-2 ml-auto">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Order Summary - Right Side (1 column) */}
        <div className="lg:col-span-1">
          <div className="border-2 border-black p-6">
            <h2 className="text-2xl font-bold mb-6">ORDER SUMMARY</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold">Subtotal</span>
                <span>${formattedSubtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Est. Shipping</span>
                <span className="text-green-600">Free for you!</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Est. Taxes</span>
                <span>—</span>
              </div>
            </div>

            <div className="border-t-2 border-black pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Estimated Total</span>
                <span className="text-2xl font-bold">${formattedSubtotal}</span>
              </div>
            </div>

            <button
              disabled={cartItems.length === 0}
              className="w-full bg-white border-2 border-black py-3 text-lg font-semibold hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t-2 border-black mb-12"></div>

      {/* Popular Products Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Popular products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-200 py-16 px-8 rounded">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Get new updates and discount
            <br />
            offers sign up now!
          </h2>
          <p className="text-white text-sm mb-6 opacity-80">
            Interdum et malesuada fames ac ante ipsum primis in
            <br />
            faucibus. Praesent malesuada augue at velit posuere
            <br />
            consectetur
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder=""
              className="flex-1 px-4 py-3 border-2 border-gray-400 rounded"
            />
            <button className="px-8 py-3 border-2 border-gray-600 text-gray-700 bg-white rounded hover:bg-gray-100">
              Keep Me Alerted
            </button>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
            <div className="text-gray-400 text-6xl">📷</div>
          </div>
        </div>
      </div>
    </div>
  );
}
