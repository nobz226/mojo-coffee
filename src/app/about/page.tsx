"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image
          src="/coffeebeans.png"
          alt="Coffee beans background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
            Inspired by the World,<br />
            Brewed with Love
          </h1>
        </div>
      </div>

      {/* Our Story Section - Text Left, Image Right */}
      <div className="bg-[#E8D5C4] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                At Mojo Coffee Blend, every cup has a story tied to tradition, 
                taste, and culture that unites people. Our cafe was envisioned to 
                bring the heart of global coffee culture to a single welcoming space. 
                From the aroma of freshly roasted beans to the first warm sip, Mojo 
                captures the essence of what coffee is truly about: connection, care, 
                and creativity.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/about1.jpeg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Our Coffee Section - Image Left, Text Right */}
      <div className="bg-[#E8D5C4] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden order-2 lg:order-1">
              <Image
                src="/about2.jpeg"
                alt="Our Coffee"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Coffee</h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                Our passion for coffee starts at its source. We import from responsible 
                farms around the world to bring you beans that are grown to last, chosen 
                for their quality. Each blend announces its unique origin: full-bodied and 
                bold, smooth and balanced, or floral fragrant. We roast each batch in 
                small batches to ensure freshness and to highlight the natural traits that 
                makes each coffee special. However you take it — a rich espresso, a creamy 
                latte, or a cold brew that steeped slowly — Mojo Coffee Blend is designed 
                to craft each cup into a soothing ritual.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Reason Section - Text Left, Image Right */}
      <div className="bg-[#E8D5C4] py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Reason</h2>
              <p className="text-lg text-gray-800 leading-relaxed">
                Mojo originated from a position of faith that coffee unites us in a way 
                that few other things can. It is about community, about connection, and 
                about cherishing the simple moments. We aspired to create a space that 
                respects global inspiration and local heritage, a cafe that feels a little 
                bit like home, no matter where you come from. Our drive comes from an 
                appreciation for craft, for sustainability, and for appreciating every 
                day goodness in the shared cup of coffee.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/about3.jpeg"
                alt="Our Reason"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner Section */}
      <div className="bg-[#8B9D83] py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          More Than Coffee — Its a Connection.
        </h2>
        <p className="text-lg text-white max-w-4xl mx-auto leading-relaxed">
          From our first roast to our latest seasonal blend, Mojo has remained dedicated 
          to quality and heart. We continue to find the world in every flavor. So that 
          every cup is world-inspired, and made with love.
        </p>
      </div>
    </div>
  );
}