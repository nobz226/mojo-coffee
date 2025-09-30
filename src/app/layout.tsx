import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Link from 'next/link'

export const metadata = {
  title: 'Mojo Coffee Shop',
  description: 'Order your favorite coffee online!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-50 min-h-screen flex flex-col">
          <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-yellow-700">
              Mojo Coffee
            </Link>
            <nav className="space-x-4">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/products" className="hover:underline">Products</Link>
              <Link href="/cart" className="hover:underline">Cart</Link>
              <Link href="/profile" className="hover:underline">Profile</Link>
            </nav>
          </header>
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
          <footer className="bg-white shadow px-4 py-3 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Mojo Coffee Shop
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}


