import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/autopost')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    if (!adminToken) {
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  
  if (request.nextUrl.pathname === '/login') {
    const adminToken = request.cookies.get('admin_token')?.value;
    if (adminToken && request.nextUrl.searchParams.get('redirect')?.startsWith('/admin')) {
      return NextResponse.redirect(new URL(request.nextUrl.searchParams.get('redirect')!, request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/autopost/:path*', '/login'],
};
