import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin/autopost')) {
    const adminToken = request.cookies.get('admin_token')?.value;
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  if (request.nextUrl.pathname === '/admin/login') {
    const adminToken = request.cookies.get('admin_token')?.value;
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin/autopost', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/autopost/:path*', '/admin/login'],
};
