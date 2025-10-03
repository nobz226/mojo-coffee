# Mojo Coffee Shop - AI Coding Agent Instructions

## Project Overview
Next.js 15 e-commerce app for a coffee shop with Clerk authentication and Convex backend. Uses App Router, TypeScript, and Tailwind CSS v4.

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

### Key Files
- `src/middleware.ts`: Route protection (all routes protected except sign-in/sign-up)
- `src/app/layout.tsx`: Root layout with auth gating - only shows app to `<SignedIn>` users
- `src/app/Providers.tsx`: Client component wrapping Clerk + Convex providers
- `convex/schema.ts`: Database schema (currently only `users` table with `clerkUserId`)
- `convex/addUser.ts`: Mutation to insert/sync Clerk users to Convex

## Development Workflow

### Running the Project
```bash
npm run dev  # Runs Next.js with Turbopack (default port 3000)
```

**Important**: You need BOTH services running:
1. Next.js dev server (`npm run dev`)
2. Convex dev server (`npx convex dev`) - manages real-time database

### Environment Variables Required
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk public key
- `NEXT_PUBLIC_CONVEX_URL`: Convex deployment URL
- Additional Clerk secrets (see Clerk dashboard)

Store in `.env.local` (gitignored)

## Coding Conventions

### Convex Patterns
- **Mutations** use `mutation()` from `convex/server` - example: `convex/addUser.ts`
- Import types: `import { v } from "convex/values"` for schema validation
- Access via `api.fileName.default` (e.g., `api.addUser.default`)
- Convex functions live in `/convex` directory, auto-generate types to `convex/_generated/`

### Client/Server Component Rules
- `Providers.tsx`, `Header.tsx`, `SyncUser.tsx` marked `"use client"` (use hooks/state)
- Page components default to server components unless marked otherwise
- Convex hooks (`useMutation`, `useQuery`) require `"use client"`

### Path Aliases
- `@/*` maps to `src/*` (defined in `tsconfig.json`)
- Example: `import SyncUser from "@/components/SyncUser"`

### Styling
- Tailwind CSS v4 (newer syntax, uses `@tailwindcss/postcss`)
- shadcn/ui configured (see `components.json`) for future component additions
- Uses `clsx` and `tailwind-merge` via `@/lib/utils` for class merging

## Current State & Known Issues

Per `TODO.md`:
- Login flow recently fixed - middleware now properly protects routes
- `UserButton` has `afterSignOutUrl="/sign-in"` for proper logout redirect
- Main pages: Home (`/`), Products, Cart, Profile (all require auth)
- Test page at `/test` for debugging

## Integration Points

### Clerk → Convex Sync
The sync happens in `SyncUser.tsx`:
```tsx
const { user } = useUser();           // Clerk hook
const addUser = useMutation(api.addUser.default); // Convex mutation
useEffect(() => {
  if (user?.id) addUser({ clerkUserId: user.id });
}, [user, addUser]);
```

### Adding New Convex Functions
1. Create in `/convex/*.ts` (e.g., `convex/products.ts`)
2. Export with `query`, `mutation`, or `action` from `convex/server`
3. Schema changes go in `convex/schema.ts` using `defineTable()`
4. Access from client: `const data = useQuery(api.products.list)`

## Build & Deploy
```bash
npm run build  # Production build with Turbopack
npm start      # Start production server
```

Designed for Vercel deployment (Next.js native platform).
