/* eslint-disable no-underscore-dangle */
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';

const options: AuthOptions = {
  providers: [],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?._id) token._id = user._id;
      return token;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
