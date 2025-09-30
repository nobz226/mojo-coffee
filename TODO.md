# STATE.md

## Project: Mojo Coffee Shop

### Current State

- **Framework:** Next.js (App Router)
- **Authentication:** Clerk
- **Database:** Convex (users table)
- **Pages:** Home, Products, Cart, Profile, Sign-In, Test
- **Styling:** Tailwind CSS
- **Global Providers:** Clerk and Convex
- **Header:** Includes navigation and user button
- **User Sync:** Clerk user ID synced to Convex on login
- **Middleware:** Clerk middleware for route protection

---

## Issue: Login Flow Not Working as Expected

### Expected Behavior

- When the website loads, the login screen should appear.
- After logging in, the website becomes available to the user.
- The user can logout using the user button in the header.
- After logout, the user is redirected to the sign-in page.

### Current Problems

- Unauthenticated users can access protected pages.
- Logout does not always redirect to the sign-in page.
- Middleware or authentication checks may be missing or misconfigured.

---

## How to Fix

1. **Protect All Pages**
   - Wrap main layout or pages with Clerk’s authentication components (`SignedIn`, `SignedOut`, `RedirectToSignIn`).

2. **Middleware Configuration**
   - Ensure `middleware.ts` protects all routes except `/sign-in`.

3. **Logout Button**
   - Update logout logic to call Clerk’s `signOut()` and redirect to `/sign-in`.

---

## Next Steps

- Implement authentication checks in layout/pages.
- Review and update `middleware.ts`.
- Fix logout button logic in the header.

---