"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-300 py-32 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hero text and image go here
        </h1>
      </div>

      {/* Our Story Section - Image on Right */}
      <div className="max-w-7xl mx-auto py-20 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              text goes here
            </p>
          </div>
          <div className="bg-gray-300 aspect-square rounded"></div>
        </div>
      </div>

      {/* Our Coffee Section - Image on Left */}
      <div className="max-w-7xl mx-auto py-20 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-300 aspect-square rounded"></div>
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Coffee</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              text goes here
            </p>
          </div>
        </div>
      </div>

      {/* Our Reason Section - Image on Right */}
      <div className="max-w-7xl mx-auto py-20 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Reason</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              text goes here
            </p>
          </div>
          <div className="bg-gray-300 aspect-square rounded"></div>
        </div>
      </div>

      {/* Sign up for rewards Section */}
      <div className="bg-gray-200 py-32 px-8 text-center">
        <h2 className="text-4xl font-bold mb-8">Sign up for rewards!</h2>
        <Link
          href="/profile"
          className="inline-block px-12 py-4 bg-black text-white text-lg font-semibold rounded hover:bg-gray-800 transition"
        >
          Join Now
        </Link>
      </div>
    </div>
  );
}