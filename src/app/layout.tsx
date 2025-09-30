import './globals.css';
import Providers from './Providers';
import Header from './Header';

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
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
          <footer className="bg-white shadow px-4 py-3 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mojo Coffee Shop
          </footer>
        </Providers>
      </body>
    </html>
  );
}

