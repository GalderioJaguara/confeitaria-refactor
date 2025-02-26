import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.SECURITY_SECRET;
if (!secretKey) {
}
const encodedSecretKey = new TextEncoder().encode(secretKey);

export async function encode(payload: any) {
    return new SignJWT(payload).setProtectedHeader({alg: "HS256"}).setIssuedAt()
    .setExpirationTime('7d').sign(encodedSecretKey);
}
export async function decode (session: string | undefined = '') {
    if (!session) {
        return null;
    }
    try {
        const { payload } = await jwtVerify(session, encodedSecretKey, {algorithms: ['HS256']});
        return payload;
    } catch(error) {
        return null;
    }
}
export async function setCookies (userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encode({ userId, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set('session', session, {
        httpOnly: false,
        secure: false,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    });
}

export async function verifySessions() {
    const cookie = await cookies();
    const session  = cookie.get('session')?.value;
    const payload = await decode(session);

    if (!session || !payload) {
        return false;
    }
    return true;
}