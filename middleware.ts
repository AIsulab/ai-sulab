import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = new Set(["/login", "/signup"]);

const PUBLIC_API_PREFIXES = ["/api/admin/login", "/api/auth/kakao"];

function isPublicPath(pathname: string) {
  if (PUBLIC_PATHS.has(pathname)) return true;
  return PUBLIC_API_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isStaticAsset(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/assets") ||
    pathname.startsWith("/uploads") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon.png"
  );
}

function getRedirectTarget(request: NextRequest) {
  const param = request.nextUrl.searchParams.get("redirect");
  if (param?.startsWith("/") && !PUBLIC_PATHS.has(param.split("?")[0])) {
    return param;
  }
  return "/";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isStaticAsset(pathname)) {
    return NextResponse.next();
  }

  const isAuthed = Boolean(request.cookies.get("admin_token")?.value);

  if (isPublicPath(pathname)) {
    if (isAuthed && PUBLIC_PATHS.has(pathname)) {
      return NextResponse.redirect(new URL(getRedirectTarget(request), request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const loginUrl = new URL("/login", request.url);
    const destination = pathname + request.nextUrl.search;
    if (destination !== "/") {
      loginUrl.searchParams.set("redirect", destination);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};
