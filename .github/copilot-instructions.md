# Mojo Coffee Shop - AI Coding Instructions

## Project Overview
Modern international coffee shop website built with Next.js App Router. Users can browse and order coffee varieties from around the world.

## Tech Stack & Architecture
- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Framework**: Next.js 14 (App Router)
- **Database**: Convex (real-time database)
- **Authentication**: Clerk (user management and payments)
- **Deployment**: Vercel (free tier)

## Development Philosophy
**Simple. Functional. Deliverable.**
- Write the minimal code that works
- One feature at a time, fully functional before moving on
- Avoid premature optimization and over-engineering
- Prefer obvious solutions over clever ones
- Clean, readable code over complex abstractions

## Code Style Requirements

### Components
```tsx
// Simple, functional components
function CoffeeCard({ coffee }: { coffee: Coffee }) {
  return (
    <Card className="p-4">
      <h3>{coffee.name}</h3>
      <p>{coffee.price}</p>
      <Button>Add to Cart</Button>
    </Card>
  )
}
```

### Database Operations
```tsx
// Direct, straightforward Convex usage
const coffees = useQuery(api.coffees.list)
const addCoffee = useMutation(api.coffees.create)

// Simple mutations - no unnecessary complexity
await addCoffee({ name, price, origin })
```

### File Structure (Keep It Simple)
```
app/
├── page.tsx           # Home page
├── shop/
│   └── page.tsx       # Coffee catalog
├── api/               # API routes
components/
├── ui/                # shadcn components only
└── coffee-card.tsx    # Custom components
convex/
├── schema.ts          # Simple schema
└── coffees.ts         # Basic CRUD operations
```

## Key Patterns

### shadcn/ui Usage
- Install components only when needed: `npx shadcn-ui@latest add button`
- Use components as-is, minimal customization
- Stick to Tailwind classes, avoid custom CSS

### Database Schema (Simple)
```typescript
// convex/schema.ts - Start minimal, expand later
export const coffees = defineTable({
  name: v.string(),
  price: v.number(),
  origin: v.string(),
  inStock: v.boolean(),
})
```

### Authentication (Clerk)
```tsx
// Simple user checks
import { auth } from '@clerk/nextjs'

export default function ProtectedPage() {
  const { userId } = auth()
  if (!userId) return <div>Please sign in</div>
  
  return <div>Protected content</div>
}
```

## Development Workflow
1. **Build one page/feature completely** before starting the next
2. **Test functionality immediately** - no broken states
3. **Deploy early and often** to Vercel
4. **Keep commits small** and descriptive

## What to Avoid
- Complex state management (Redux, Zustand) - use Convex + React state
- Custom hooks unless absolutely necessary
- Fancy animations or micro-interactions initially
- Multiple ways to do the same thing
- Premature abstractions and generic utilities
- Over-engineered folder structures

## Essential Commands
```bash
# Development
npm run dev
npx convex dev

# Add components only when needed
npx shadcn-ui@latest add button card input

# Deploy
git push origin main  # Auto-deploys to Vercel
```

## Coffee Shop Features (Build in Order)
1. **Static coffee list** (hardcoded data first)
2. **Dynamic coffee catalog** (Convex integration)
3. **User authentication** (Clerk setup)
4. **Add to cart** (simple state management)
5. **Order placement** (basic flow)
6. **Order history** (user dashboard)

## Success Criteria
- Each feature works completely before moving on
- Code is readable by any React developer
- No unnecessary dependencies or complexity
- Fast page loads on Vercel free tier
- Mobile-responsive without custom breakpoints