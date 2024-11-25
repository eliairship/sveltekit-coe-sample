import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import Bun from 'bun';
import { generateAccessToken } from '$lib/access-token'

export const actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email) {
      return fail(400, { email, missing: true });
    }

    if (!password) {
      return fail(400, { password, missing: true });
    }

    // const user = await db.getUser(email);

    // 1. Get user from db with that email
    db.get(user, { email })
    // 2. Compare password
    // 3. Generate access token


    return { success: true };
  },
  register: async ({ cookies, request }) => {
    const data = await request.formData();
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    if (!password) {
      return fail(400, { password, missing: true })
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

    return { success: true };
  }
} satisfies Actions;
