"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function Home() {
  const products = useQuery(api.products.list);

  return (
    <div className="min-h-screen -mx-4 md:-mx-8">
      {/* Hero Section - Full Width */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-20 px-4 md:px-8 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="text-center max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Premium Coffee, Delivered Fresh
          </h1>
          <p className="text-xl text-gray-700 mb-4 leading-relaxed max-w-2xl mx-auto">
            Discover our handpicked selection of specialty coffee beans from around the world. 
            Expertly roasted to perfection, sourced sustainably, and delivered to your door.
          </p>
          <Link href="/products">
            <button className="bg-amber-900 text-white px-8 py-3 rounded-full hover:bg-amber-800 transition-colors text-lg font-semibold">
              Shop Now
            </button>
          </Link>
        </div>
      </section>

      {/* Popular Coffee Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-600 uppercase mb-2">
              Featured Selection
            </h3>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Popular Coffee
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Explore our most loved coffee varieties. Each blend is carefully selected 
              to deliver exceptional flavor and aroma. From light Ethiopian roasts to 
              bold Sumatran beans, find your perfect cup.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {products?.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-colors font-semibold">
                View All Products
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-12">
            Why Choose Us?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-900 h-48 flex items-center justify-center">
                <div className="bg-white rounded p-4">
                  <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Sustainably Sourced
                </h4>
                <p className="text-gray-600">
                  We partner directly with ethical coffee farms, ensuring fair trade 
                  practices and environmental sustainability in every bean.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-900 h-48 flex items-center justify-center">
                <div className="bg-white rounded p-4">
                  <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Freshly Roasted
                </h4>
                <p className="text-gray-600">
                  Every order is roasted to perfection within 24 hours of shipping, 
                  guaranteeing maximum freshness and flavor in every cup.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="bg-gray-900 h-48 flex items-center justify-center">
                <div className="bg-white rounded p-4">
                  <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Expertly Crafted
                </h4>
                <p className="text-gray-600">
                  Our master roasters bring decades of experience, carefully developing 
                  each roast profile to highlight unique flavor characteristics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-r from-gray-400 to-gray-500">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-4">
                Get new updates and discount offers sign up now!
              </h2>
              <p className="text-gray-100 mb-6">
                Join our coffee community and be the first to know about new arrivals, 
                exclusive blends, and special promotions. Plus, get 10% off your first order!
              </p>
              <form className="bg-white rounded-lg p-6">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button 
                  type="submit"
                  className="w-full border-2 border-gray-900 text-gray-900 px-6 py-2 rounded hover:bg-gray-900 hover:text-white transition-colors font-semibold"
                >
                  Keep Me Alerted
                </button>
              </form>
            </div>

            <div className="flex justify-center">
              <div className="bg-gray-300 rounded-2xl p-12 w-80 h-80 flex items-center justify-center">
                <div className="bg-white rounded-lg p-8">
                  <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

