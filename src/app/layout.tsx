import './globals.css';
import Providers from './Providers';
import Header from './Header';
import Footer from './Footer';
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export const metadata = {
  title: 'Mojo Coffee Shop',
  description: 'Order your favorite coffee online!',
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Providers>
          <SignedIn>
            <Header />
            <main className="flex-1 container mx-auto px-4">
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

