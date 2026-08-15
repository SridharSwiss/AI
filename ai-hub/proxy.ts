import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/auth/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Run on all paths except static assets and image files, so the auth
     * session cookie is refreshed everywhere and gated routes are protected.
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|manifest.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
