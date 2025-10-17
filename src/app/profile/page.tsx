"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useUser();

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* My Account Header */}
      <div className="bg-black text-white py-8 px-6 mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Profile</h2>
              <button className="text-sm underline">Edit</button>
            </div>
            <div className="space-y-3 text-gray-700">
              <div>
                <p className="text-sm font-semibold">Name</p>
                <p>{user.fullName || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Email</p>
                <p>{user.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Password</h2>
              <button className="text-sm underline">Edit</button>
            </div>
            <p className="text-gray-700">••••••••••</p>
          </div>

          {/* Address Section */}
          <div className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Address</h2>
              <button className="text-sm underline">Edit</button>
            </div>
            <div className="text-gray-700">
              <p>123 lalaland street Vancouver, BC</p>
              <p>V8T1B1 <span className="ml-2 text-sm">(default)</span></p>
            </div>
            <button className="text-sm underline mt-3">Add new</button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Payment Section */}
          <div className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Payment</h2>
              <button className="text-sm underline">View</button>
            </div>
            <p className="text-gray-700">Mastercard ••••••••4098</p>
          </div>

          {/* Order History Section */}
          <div className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Order History</h2>
              <button className="text-sm underline">View</button>
            </div>
            <p className="text-gray-700">Last ordered on Oct 7, 2025</p>
          </div>

          {/* Reward Points Section */}
          <div className="border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Reward Points</h2>
              <button className="text-sm underline">View</button>
            </div>
            <p className="text-gray-700">30 points</p>
          </div>
        </div>
      </div>

      {/* The Perks Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">The Perks</h2>
        <div className="space-y-6">
          <div className="border-b pb-6">
            <p className="text-xl">Free drinks on your birthday!</p>
          </div>
          <div className="border-b pb-6">
            <p className="text-xl">$5 off when you reach 30 points</p>
          </div>
          <div className="border-b pb-6">
            <p className="text-xl">$10 off when you reach 60 points</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <h3 className="text-4xl font-bold">MOJO</h3>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-pink-600 hover:opacity-80">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              <Link href="#" className="text-red-600 hover:opacity-80">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </Link>
              <Link href="#" className="text-black hover:opacity-80">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold mb-3">Hours</h4>
            <p className="text-sm text-gray-700">Mon-Fri: 10am - 5pm</p>
            <p className="text-sm text-gray-700">Sat-Sun: 10am - 3pm</p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3">Contact</h4>
            <p className="text-sm text-gray-700">askus@mojocoffee.ca</p>
            <p className="text-sm text-gray-700">778-906-0044</p>
            <p className="text-sm text-gray-700 mt-2">500 Robson St.</p>
            <p className="text-sm text-gray-700">Vancouver, BC, V6T1J9</p>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold mb-3">Info</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li><Link href="#" className="hover:underline">Supply chain</Link></li>
              <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:underline">Shipping & Refund</Link></li>
              <li><Link href="#" className="hover:underline">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}