import withAuth from 'next-auth/middleware';
import { decode } from './lib/jwt';

export default withAuth({
  jwt: { decode } as any,

  callbacks: {
    authorized: (params) => {
      const token = params.req.cookies.get('next-auth.session-token')?.value;
      return !!token;
    },
  },
});

export const config = { matcher: ['/account', '/watchlist'] };
