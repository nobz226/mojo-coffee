"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useConvexUser } from "@/hooks/useConvexUser";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { convexUser } = useConvexUser();
  const cartItems = useQuery(
    api.cart.getUserCart,
    convexUser ? { userId: convexUser._id } : "skip"
  );
  const updateQuantity = useMutation(api.cart.updateQuantity);
  const removeFromCart = useMutation(api.cart.removeFromCart);
  const clearCart = useMutation(api.cart.clearCart);

  if (!convexUser || !cartItems) {
    return <div className="p-8">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">
          Start shopping to add items to your cart!
        </p>
        <Link href="/" className="bg-blue-600 text-white px-6 py-3 inline-block">
          Browse Products
        </Link>
      </div>
    );
  }

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);
  const formattedSubtotal = (subtotal / 100).toFixed(2);

  const handleQuantityChange = async (cartItemId: any, newQuantity: number) => {
    await updateQuantity({ cartItemId, quantity: newQuantity });
  };

  const handleRemove = async (cartItemId: any) => {
    if (confirm("Remove this item from cart?")) {
      await removeFromCart({ cartItemId });
    }
  };

  const handleClearCart = async () => {
    if (confirm("Clear all items from cart?")) {
      await clearCart({ userId: convexUser._id });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => {
          if (!item.product) return null;

          const itemPrice = (item.product.price / 100).toFixed(2);
          const itemTotal = ((item.product.price * item.quantity) / 100).toFixed(
            2
          );

          return (
            <div key={item._id} className="border p-4 flex gap-4">
              {/* Product Image */}
              <Link href={`/products/${item.productId}`}>
                <div className="relative w-24 h-24 bg-gray-200 flex-shrink-0">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* Product Details */}
              <div className="flex-grow">
                <Link href={`/products/${item.productId}`}>
                  <h3 className="font-bold text-lg hover:text-blue-600">
                    {item.product.name}
                  </h3>
                </Link>
                <div className="flex gap-2 text-sm text-gray-600 mt-1">
                  <span>{item.product.origin}</span>
                  <span>•</span>
                  <span>{item.product.roastType} Roast</span>
                </div>
                <p className="text-gray-600 mt-2">${itemPrice} each</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity - 1)
                    }
                    className="border px-3 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item._id, item.quantity + 1)
                    }
                    className="border px-3 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold text-lg">${itemTotal}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 border-t pt-6">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl font-bold">Subtotal:</span>
          <span className="text-2xl font-bold">${formattedSubtotal}</span>
        </div>

        <div className="flex gap-4">
          <Link
            href="/"
            className="flex-1 border border-blue-600 text-blue-600 px-6 py-3 text-center hover:bg-blue-50"
          >
            Continue Shopping
          </Link>
          <button className="flex-1 bg-blue-600 text-white px-6 py-3 hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
