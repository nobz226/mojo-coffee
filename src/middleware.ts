import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware();

export const config = {
  matcher: ["/((?!sign-in|_next|static|favicon.ico|.*\\..*).*)"],
};