/* eslint-disable no-underscore-dangle */
import { AuthOptions } from 'next-auth';
import bcrypt from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import { User } from '../../../../models/User';
import { encode, decode } from '../../../../lib/jwt';
import dbConnect from '../../../../lib/databse';

const authOptions: AuthOptions = {
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
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Enter Email and Password.');
        }

        await dbConnect();

        const user = await User.findOne(
          { email: credentials?.email },
          'id name email password image -_id'
        );

        if (!user) {
          throw new Error('Invalid Email or Password!');
        }

        const passowrdMatch = await bcrypt.compare(
          credentials?.password,
          user.password
        );

        if (!passowrdMatch) {
          throw new Error('Invalid Email or Password!');
        }

        // const userData = {
        //   name: user.name,
        //   email: user.email,
        //   iat: Date.now(),
        //   iss: 'Movielust',
        // };

        // const token = await new Promise((resolve, reject) => {
        //   jwt.sign(userData, process.env.NEXTAUTH_SECRET!, (err, _token) => {
        //     if (err) reject(err);
        //     resolve(_token);
        //   });
        // });

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          // token,
        };
      },
    }),
  ],
  jwt: {
    encode,
    decode,
  } as any,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    // @ts-ignore
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

export default authOptions;
