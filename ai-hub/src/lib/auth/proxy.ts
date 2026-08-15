import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Sections gated entirely — index and all sub-pages require sign-in. */
const FULLY_GATED = ["/consulting-toolkit"];
/** Sections whose index/listing is public (SEO) but detail pages are gated. */
const DETAIL_GATED = ["/case-studies", "/compliance"];

function isGated(pathname: string): boolean {
  if (FULLY_GATED.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return true;
  }
  // Only sub-paths (a specific slug) are gated — the bare index stays public.
  if (DETAIL_GATED.some((p) => pathname.startsWith(`${p}/`))) {
    return true;
  }
  return false;
}

/**
 * Refreshes the Supabase auth session (keeps cookies fresh) and redirects
 * unauthenticated users away from gated routes to the login page.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fail-safe: if auth env vars are not configured yet, do not gate or crash —
  // the site stays fully functional until Supabase auth keys are added.
  if (!url || !anonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: getUser() revalidates the token — do not remove.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && isGated(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
