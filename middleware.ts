// import withAuth from 'next-auth/middleware';

import { NextRequest, NextResponse } from 'next/server';

// import { decode } from './lib/jwt';

// export default withAuth({
//   jwt: { decode } as any,

//   pages: {
//     signIn: '/signin',
//   },

//   callbacks: {
//     authorized: (params) =>
//       !!params.req.cookies.get('next-auth.session-token')?.value,
//   },
// });

// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;

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
  matcher: ['/account', '/watchlist', '/api/user(=.|/|$)'],
};
