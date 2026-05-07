import * as jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'change_this_secret';

export function signJwt(payload: any, opts?: jwt.SignOptions) {
  return jwt.sign(payload, SECRET, opts || { expiresIn: '1h' });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, SECRET) as any;
}
