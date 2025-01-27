import { client } from '$lib/auth/client';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
  const code = url.searchParams.get("code")
  const exchanged = await client.exchange(code!, `http://localhost:5173/auth/callback`)
  // const exchanged = await client.exchange(code!, `${url.origin}/api/callback`)


  if (exchanged.err) {
    return new Response("❌ - Failed")
  }
  // await setTokens(exchanged.tokens.access, exchanged.tokens.refresh)
  cookies.set(
    "access_token",
    exchanged.tokens.access,
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 34560000,
    })
  cookies.set(
    "refresh_token",
    exchanged.tokens.refresh,
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 34560000,
    }
  )
  return redirect(303, `${url.origin}/`)
};
