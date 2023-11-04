import jwt from 'jsonwebtoken';
import { JWTDecodeParams, JWTEncodeParams } from 'next-auth/jwt';

export async function encode({ secret, token }: JWTEncodeParams) {
  return jwt.sign(token as any, secret);
}

export async function decode({ secret, token }: JWTDecodeParams) {
  return jwt.verify(token as any, secret);
}
