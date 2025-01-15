import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Define your JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

// Define routes that require authentication
const isProtectedRoute = createRouteMatcher(["/donate(.*),/request(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    try {
      await auth.protect();
    } catch {
      const authHeader = req.headers.get("authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
          { message: "Unauthorized: No valid Clerk session or JWT token" },
          { status: 401 }
        );
      }

      const token = authHeader.split(" ")[1];

      try {
        jwt.verify(token, JWT_SECRET as string);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.json(
          { message: "Unauthorized: Invalid or expired JWT token" },
          { status: 401 }
        );
      }
    }
  }

  // If the route is not protected, allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Apply the middleware to all routes except static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Apply the middleware to API and RPC routes
    "/(api|trpc)(.*)",
  ],
};
