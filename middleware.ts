/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;

  console.log('token', token);
  console.log('request', request);

  if (!token && request.nextUrl.pathname.startsWith('/api/user')) {
    return Response.json(
      {
        success: 'error',
        message: 'Unauthenticated.',
      },
      { status: 401 }
    );
  }

  if (!token) {
    return NextResponse.redirect(
      new URL(`/signin?callbackURL=${request.nextUrl.pathname}`, request.url!)
    );
  }
}

export const config = {
  // do not add pages routes middleware will fail
  matcher: ['/api/user(=.|/|$)'],
};
