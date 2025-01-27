import { generateAccessToken } from '$lib/access-token';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import Bun from 'bun';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';
import { client, clientID } from '../../../lib/auth/client'

export const load: PageServerLoad = async () => {
  const { url } = await client.authorize(
    "http://localhost:5173/auth/callback",
    "code",
  )

  return { url }
}
export const actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email) {
      return fail(400, { email, missingEmail: true });
    }

    if (!password) {
      return fail(400, { email, missingPassword: true });
    }

    // 1. Get user from db with that email
    const existingUser = await db.query.user.findFirst({
      where: eq(user.email, email)
    })

    if (!existingUser) {
      return fail(400, { email, incorrect: true });
    }

    // 2. Compare password
    // const hash = await Bun.password.hash(password);

    const isMatch = await Bun.password.verify(password, existingUser.password);

    if (!isMatch) {
      return fail(400, { email, incorrect: true });
    }

    // 3. Generate access token
    const accessToken = await generateAccessToken(existingUser.id)

    cookies.set('sessionid', accessToken, { path: '/' });

    redirect(303, '/');

  },
  register: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    if (!password) {
      return fail(400, { email, missing: true })
    }


    // Steps
    // 1. Hash password with bcrypt
    const hash = await Bun.password.hash(password);
    // 2. Save user in db
    const userResult = await db.insert(user).values({
      email,
      password: hash
    }).returning({ id: user.id })
    const returnUser = userResult[0]
    // 3. Generate an access token
    const accessToken = await generateAccessToken(returnUser.id)
    cookies.set('sessionid', accessToken, { path: '/' });

    redirect(303, '/');
  }
} satisfies Actions;
