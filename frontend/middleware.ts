import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  let token: string | undefined;

  token = req.cookies.get('auth-token')?.value;

  if (req.nextUrl.pathname.startsWith('/feed') && !token)
    return NextResponse.redirect(new URL('/login', req.url));

  if (req.nextUrl.pathname.startsWith('/login') && token)
    return NextResponse.redirect(new URL('/feed', req.url));

  if (req.nextUrl.pathname.startsWith('/signup') && token)
    return NextResponse.redirect(new URL('/feed', req.url));

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ['/feed', '/login', '/signup'],
};
