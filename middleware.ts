import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)", "/sign-up(.*)" // Expose only these routes
]);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) auth().protect(); // Redirect
});

export const config = {
  matcher: [
    // Always run for the API routes
    "/(api|trpc)(.*)",
    // Skip the `Next.js` internals and all static files, unless found in the Search parameters
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"
  ]
};
