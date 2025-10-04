# Mojo Coffee Shop - AI Coding Agent Instructions

## Project Overview
Next.js 15 e-commerce app for a coffee shop with Clerk authentication and Convex real-time database backend. Uses App Router, TypeScript, and Tailwind CSS v4.

## Architecture & Data Flow

### Authentication Pattern (Clerk + Convex Sync)
- **Clerk** handles authentication in `src/middleware.ts` with `clerkMiddleware()`
- **User sync flow**: `Providers.tsx` → `SyncUser.tsx` → `convex/addUser.ts`
- `SyncUser` component auto-runs on mount, syncing Clerk user ID to Convex `users` table
- All pages protected by default via `RootLayout` using `<SignedIn>` and `<SignedOut>` wrappers
- Public routes defined in `middleware.ts` via `createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])`

### Provider Hierarchy (Critical!)
```tsx
ClerkProvider → ConvexProvider → SyncUser → children
```
This order in `Providers.tsx` is essential - Convex needs Clerk context, SyncUser needs both.

### Database Schema (Convex)

#### Users Table
```typescript
users: {
  clerkUserId: string (indexed)
}
```

#### Products Table
```typescript
products: {
  name: string
  description: string
  price: number (in cents, e.g., 1899 = $18.99)
  imageUrl: string (Unsplash URLs configured in next.config.ts)
  origin: string (e.g., "Ethiopia", "Colombia")
  roastType: string (e.g., "Light", "Medium", "Dark")
  dietaryProfile: {
    nonDairy: boolean
    glutenFree: boolean
  }
  inStock: boolean
  createdAt: number (timestamp)
}
// Indexes: by_name, by_roast_type
```

#### Cart Items Table
```typescript
cartItems: {
  userId: Id<"users">
  productId: Id<"products">
  quantity: number
  addedAt: number (timestamp)
}
// Indexes: by_user, by_user_and_product
```

### Key Files & Components

#### Authentication & Setup
- `src/middleware.ts`: Route protection (all routes protected except sign-in/sign-up)
- `src/app/layout.tsx`: Root layout with auth gating
- `src/app/Providers.tsx`: Client component wrapping Clerk + Convex providers
- `src/components/SyncUser.tsx`: Auto-syncs Clerk users to Convex on mount

#### Product System
- `convex/products.ts`: Queries for fetching products (list, getById, getByRoastType)
- `convex/seedProducts.ts`: Seed script with 6 demo coffee products
- `src/components/ProductCard.tsx`: Reusable product card with Add to Cart functionality
- `src/app/page.tsx`: Homepage with product grid, search/filter placeholders
- `src/app/products/page.tsx`: Products listing page
- `src/app/products/[id]/page.tsx`: Individual product detail page

#### Shopping Cart System
- `convex/cart.ts`: Cart mutations and queries
  - `getUserCart`: Fetch user's cart with product details
  - `addToCart`: Add item or increment quantity if exists
  - `updateQuantity`: Update item quantity (+/- buttons)
  - `removeFromCart`: Remove single item
  - `clearCart`: Empty entire cart
- `src/app/cart/page.tsx`: Cart page with quantity controls, totals
- `src/hooks/useConvex.ts`: Custom hook to get Convex user from Clerk user
- `convex/users.ts`: Query to fetch user by Clerk ID

## Development Workflow

### Running the Project
```bash
npm run dev  # Runs Next.js with Turbopack (default port 3000)
```

**Important**: You need BOTH services running simultaneously:
1. Next.js dev server: `npm run dev` (Terminal 1)
2. Convex dev server: `npx convex dev` (Terminal 2)

### Seeding Demo Data
```bash
npx convex run seedProducts:seed
```
This populates the database with 6 coffee products (Ethiopian Yirgacheffe, Colombian Supremo, Sumatra Mandheling, Costa Rican Tarrazu, Brazilian Santos, Kenyan AA).

### Environment Variables Required
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud
```
Store in `.env.local` (gitignored)

## Current Project Status (Last Updated: Oct 3, 2025)

### ✅ Completed Features

1. **Authentication System**
   - Clerk integration with user sync to Convex
   - Protected routes via middleware
   - Sign in/out flow with proper redirects
   - User profile page at `/profile`

2. **Product Catalog**
   - Full database schema with dietary profiles
   - 6 seeded demo products with real images
   - Product listing on homepage (`/`)
   - Individual product detail pages (`/products/[id]`)
   - Product card component with image, price, origin, roast type
   - Images from Unsplash (configured in `next.config.ts`)

3. **Shopping Cart**
   - Add to cart from product cards and detail pages
   - User-specific carts (tied to Convex user ID)
   - Cart page at `/cart` with full functionality:
     - View all cart items with images
     - Quantity controls (+/- buttons)
     - Remove individual items
     - Clear entire cart
     - Subtotal calculation
   - Real-time updates via Convex
   - Cart persists across sessions

### 🚧 In Progress / Placeholder Features

1. **Homepage Filters**
   - UI placeholders exist (Product Types, Dietary Preferences, Search)
   - Not yet wired to filter functionality
   - Pagination buttons present but non-functional

2. **Checkout Flow**
   - "Proceed to Checkout" button exists but not implemented
   - No payment integration yet

### 📋 Not Yet Started

- Product search functionality
- Filter by roast type, origin, dietary preferences
- Admin panel for product management
- Order history
- Payment processing
- Product reviews/ratings
- Wishlist functionality

## Coding Conventions

### Convex Patterns
- **Mutations** use `mutation()` from `./_generated/server`
- **Queries** use `query()` from `./_generated/server`
- Import validation: `import { v } from "convex/values"`
- Access from client: `useMutation(api.cart.addToCart)` or `useQuery(api.products.list)`
- Convex functions live in `/convex` directory
- Types auto-generate to `convex/_generated/`

### Client/Server Component Rules
- Components using hooks/state need `"use client"` directive
- Convex hooks (`useMutation`, `useQuery`, `useUser`) require client components
- Examples: `Providers.tsx`, `Header.tsx`, `SyncUser.tsx`, `ProductCard.tsx`, all pages with Convex queries

### Path Aliases
- `@/*` maps to `src/*` (defined in `tsconfig.json`)
- Example: `import { useConvexUser } from "@/hooks/useConvex"`

### Styling
- Tailwind CSS v4 (newer syntax, uses `@tailwindcss/postcss`)
- shadcn/ui configured for component additions
- Minimal styling currently - focused on functionality over aesthetics
- Uses basic borders, padding, hover states

### Price Handling
- Always store prices in **cents** (integer) in database
- Convert to dollars for display: `(price / 100).toFixed(2)`
- Example: `1899` in DB → `$18.99` in UI

## Integration Points

### Clerk → Convex User Sync
```tsx
// In SyncUser.tsx
const { user } = useUser();           // Clerk hook
const addUser = useMutation(api.addUser.default);
useEffect(() => {
  if (user?.id) addUser({ clerkUserId: user.id });
}, [user, addUser]);
```

### Getting Convex User from Clerk Session
```tsx
// Use the custom hook
import { useConvexUser } from "@/hooks/useConvex";

const { convexUser, isLoading } = useConvexUser();
// convexUser has _id for cart operations
```

### Adding New Convex Functions
1. Create file in `/convex/*.ts` (e.g., `convex/orders.ts`)
2. Export with `query`, `mutation` from `./_generated/server`
3. Schema changes go in `convex/schema.ts` using `defineTable()`
4. Access from client: `const data = useQuery(api.orders.list)`

### Adding External Images
Update `next.config.ts` to allow new domains:
```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    // Add more domains here
  ],
}
```

## Common Tasks

### Add a New Product Field
1. Update `convex/schema.ts` in products table
2. Update `convex/seedProducts.ts` demo data
3. Update `ProductCard.tsx` and product detail page to display
4. Re-run seed: `npx convex run seedProducts:seed`

### Add Cart Badge to Header
```tsx
const cart = useQuery(api.cart.getUserCart, 
  convexUser ? { userId: convexUser._id } : "skip"
);
const itemCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;
```

### Filter Products by Roast Type
```tsx
const products = useQuery(api.products.getByRoastType, { roastType: "Medium" });
```

## Next Steps / Roadmap

Based on current state, logical next features to implement:

1. **Product Filtering** - Wire up existing filter UI to Convex queries
2. **Search** - Implement product search by name/description
3. **Cart Badge** - Show cart item count in header
4. **Better Feedback** - Replace `alert()` with toast notifications
5. **Checkout Flow** - Build order submission (pre-payment)
6. **Admin Panel** - CRUD operations for products
7. **Payment Integration** - Stripe or similar
8. **Order History** - Store and display past orders

## Build & Deploy
```bash
npm run build  # Production build with Turbopack
npm start      # Start production server
```

Designed for Vercel deployment. Convex automatically deploys via CLI.

## Troubleshooting

### "Module not found: @/hooks/useConvex"
- Verify `src/hooks/useConvex.ts` exists (note: NOT `useConvexUser.ts`)
- Restart both dev servers

### Images not loading
- Check `next.config.ts` has hostname in `remotePatterns`
- Restart Next.js dev server after config changes

### Cart not updating
- Ensure both Next.js AND Convex dev servers are running
- Check browser console for Convex connection errors
- Verify user is authenticated (required for cart operations)

### "Cannot read properties of undefined"
- Check if `convexUser` exists before cart operations
- Use conditional rendering: `if (!convexUser) return <div>Loading...</div>`
