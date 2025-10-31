"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#4A3933] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="relative w-32 h-32 mb-2">
              <Image
                src="/mojo-logo-white.svg"
                alt="Mojo Coffee"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Hours Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Hours</h3>
            <p className="text-gray-300 mb-2">Mon-Fri: 10am - 5pm</p>
            <p className="text-gray-300">Sat-Sun: Closed</p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <a
              href="mailto:hello@mojocoffeeblend.com"
              className="text-gray-300 hover:text-white block mb-2"
            >
              hello@mojocoffeeblend.com
            </a>
            <a
              href="tel:778-906-0044"
              className="text-gray-300 hover:text-white block mb-2"
            >
              778-906-0044
            </a>
            <address className="text-gray-300 not-italic">
              500 Robson St,
              <br />
              Vancouver, BC, V8T1J9
            </address>
          </div>

          {/* Info Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/supply-chain" className="text-gray-300 hover:text-white">
                  Supply chain
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-300 hover:text-white">
                  Shipping & Refund
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}