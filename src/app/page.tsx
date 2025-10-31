"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const products = useQuery(api.products.list);

  // Featured drinks with specific images
  const featuredDrinks = [
    {
      id: 1,
      name: "Mexican Spiced Chocolate Mocha",
      image: "/feature1.jpeg",
    },
    {
      id: 2,
      name: "Peppermint Velvet Cold Brew",
      image: "/feature2.jpeg",
    },
    {
      id: 3,
      name: "Turkish Delight Mocha",
      image: "/feature3.jpeg",
    },
    {
      id: 4,
      name: "Gingerbread Latte Bliss",
      image: "/gingerbread.jpeg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.jpeg"
            alt="Mojo Coffee drinks"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-[#E8D5C4]/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Flavors Inspired By Coffee Cultures Around The World.
          </h1>
          <p className="text-lg text-gray-900 mb-8 max-w-2xl mx-auto">
            Discover flavors inspired by coffee cultures around the world.
          </p>
          <Link href="/products">
            <button className="bg-[#8B9D83] text-white px-10 py-4 rounded-full hover:bg-[#7a8a72] transition-colors text-lg font-semibold shadow-lg">
              Explore Our Blends
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Drinks Section */}
      <section className="py-16 px-4 bg-[#8B9D83]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Featured Drinks
            </h2>
            <p className="text-gray-800 max-w-3xl mx-auto">
              From our bold Espresso Origins to smooth Mojo House Blend — explore
              flavors inspired by cultures across the world.
            </p>
          </div>

          {/* Featured Drinks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredDrinks.map((drink) => (
              <div
                key={drink.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <Link href="/products">
                    <button className="w-full bg-white text-gray-900 px-6 py-3 rounded-md border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors font-semibold">
                      Add to cart
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-[#4A3933]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 - Sustainably Sourced */}
            <div className="text-center text-white">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/sustain.png"
                    alt="Sustainably Sourced"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Sustainably Sourced</h3>
              <p className="text-gray-300">
                Supporting local farmers and eco-friendly growing practices.
              </p>
            </div>

            {/* Feature 2 - Freshly Roasted */}
            <div className="text-center text-white">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/roast.png"
                    alt="Freshly Roasted"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Freshly Roasted</h3>
              <p className="text-gray-300">
                Every batch is roasted in small quantities for unmatched freshness.
              </p>
            </div>

            {/* Feature 3 - Expertly Crafted */}
            <div className="text-center text-white">
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 relative">
                  <Image
                    src="/expert.png"
                    alt="Freshly Roasted"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Expertly Crafted</h3>
              <p className="text-gray-300">
                Our baristas and blenders bring passion and precision to every cup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-[#8B9D83]">
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
              <div className="relative w-150 h-150 overflow-hidden">
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

