import jwt from 'jsonwebtoken';

interface JWTPayload {
  sub: number;
}


const secretKey = Bun.env.SESSION_KEY ?? 'some-random-key';

export async function generateAccessToken(userId: number): Promise<string> {
  const payload: JWTPayload = { sub: userId };
  return jwt.sign(payload, secretKey, {
    expiresIn: '7d',
  });
}

export async function verifyAccessToken(
  accessToken: string
): Promise<string | JWTPayload> {
  return jwt.verify(accessToken, secretKey) as string | JWTPayload;
}
