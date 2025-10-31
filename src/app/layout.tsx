import './globals.css';
import Providers from './Providers';
import Header from './Header';
import Footer from './Footer';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import localFont from 'next/font/local';

const rollingStone = localFont({
  src: '../../public/RollingStone.ttf',
  variable: '--font-rolling-stone',
  display: 'swap',
});

export const metadata = {
  title: 'Mojo Coffee Shop',
  description: 'Order your favorite coffee online!',
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={rollingStone.variable}>
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Providers>
          <SignedIn>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </Providers>
      </body>
    </html>
  );
}

