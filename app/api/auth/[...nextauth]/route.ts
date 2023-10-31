/* eslint-disable no-underscore-dangle */
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import { SERVER_URI } from '../../../../config';

const options: AuthOptions = {
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const credentialDetails = {
          email: credentials?.email,
          password: credentials?.password,
        };

        try {
          const res = await fetch(`${SERVER_URI}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentialDetails),
          });

          if (!res.ok) return null;

          const user = await res.json();

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.profile,
            token: user.token,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        // session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
        // session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
