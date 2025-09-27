# Mojo Coffee Shop ☕

Modern international coffee shop website where users can browse and order different varieties of coffee from around the world.

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Convex (real-time database)
- **Authentication**: Clerk (user management & payments)
- **Deployment**: Vercel (free tier)

## 📁 Project Structure

```
├── app/                 # Next.js App Router pages and layouts
│   ├── (auth)/         # Authentication pages
│   ├── api/            # API routes
│   ├── shop/           # Coffee catalog and product pages
│   └── globals.css     # Global styles
├── components/          # Reusable React components
│   ├── ui/             # shadcn/ui components
│   └── custom/         # Custom business components
├── convex/             # Database schema and functions
├── lib/                # Utility functions and configurations
├── public/             # Static assets (images, icons)
└── types/              # TypeScript type definitions
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone and setup the project**
```bash
git clone <repository-url>
cd mojo-coffee
npm install
```

2. **Initialize Next.js with App Router**
```bash
npx create-next-app@latest . --typescript --tailwind --app
```

3. **Setup shadcn/ui components**
```bash
npx shadcn-ui@latest init
```

4. **Initialize Convex database**
```bash
npm install convex
npx convex dev
```

5. **Install Clerk authentication**
```bash
npm install @clerk/nextjs
```

### Environment Variables

Create a `.env.local` file:

```env
# Convex
CONVEX_DEPLOYMENT=your-convex-deployment-url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Optional: Clerk Webhook (for production)
CLERK_WEBHOOK_SECRET=whsec_...
```

### Development

```bash
# Start development servers
npm run dev          # Next.js development server
npx convex dev      # Convex database (run in separate terminal)
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema (Simple)

Initial Convex schema for MVP:

```typescript
// convex/schema.ts
export const coffees = defineTable({
  name: v.string(),
  origin: v.string(),
  price: v.number(),
  description: v.string(),
  imageUrl: v.optional(v.string()),
  inStock: v.boolean(),
})

export const orders = defineTable({
  userId: v.string(),
  coffeeId: v.id("coffees"),
  quantity: v.number(),
  status: v.union(v.literal("pending"), v.literal("completed")),
  createdAt: v.number(),
})
```

## 🎨 shadcn/ui Quick Start

shadcn/ui provides pre-built, customizable components. Common components you'll use:

```bash
# Install essential components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add badge
```

Example usage:
```tsx
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function CoffeeCard() {
  return (
    <Card className="p-4">
      <h3>Ethiopian Yirgacheffe</h3>
      <Button>Add to Cart</Button>
    </Card>
  )
}
```

## 🚢 Deployment (Vercel Free Tier)

### Automatic Deployment
1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push to main branch

### Vercel Free Tier Limits
- 100GB bandwidth/month
- 1000 serverless function invocations/day
- Perfect for MVP and small-scale applications

### Deploy Commands
```bash
# Manual deployment
npx vercel

# Production deployment
npx vercel --prod
```

## 🏗️ Development Roadmap

### Phase 1 (MVP)
- [ ] Basic coffee catalog
- [ ] User authentication
- [ ] Simple ordering system
- [ ] Responsive design

### Phase 2 (Enhanced)
- [ ] Advanced filtering and search
- [ ] Order history and tracking
- [ ] Payment integration
- [ ] Admin dashboard

### Phase 3 (Scale)
- [ ] Multiple coffee shops
- [ ] Subscription services
- [ ] Mobile app
- [ ] Advanced analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This project is optimized for Vercel's free tier and uses modern React patterns with the App Router. The schema is kept simple initially and can be expanded as the application grows.
