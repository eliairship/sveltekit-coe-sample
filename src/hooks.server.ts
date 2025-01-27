// src/+hooks.server.js
import { redirect } from "@sveltejs/kit";
import { verifyAccessToken } from '$lib/access-token'



// define the routes of we want to be possible to access without auth
const public_paths = [
  '/auth'
];


// EXAMPLE `handleFetch`
// export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
//   const url = new URL(request.url);
//   if (url.pathname.includes('auth') && !url.pathname.includes('me')) {
//     return await fetch(request);
//   }
//   request.headers.set('Authorization', `Bearer ${event.locals.user.AccessToken}`);
//   return await fetch(request);
// };



export const handleFetch = async ({ request, fetch }) => {
  const url = new URL(request.url);


  // if (isPublicPath(url.pathname)) {
  return await fetch(request)
  // }
}

// function to verify if the request path is inside the public_paths array
function isPublicPath(path: string) {
  return public_paths.some(allowedPath =>
    path === allowedPath || path.startsWith(allowedPath + '/')
  );
}

export const handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get('sessionid')

  const url = new URL(event.request.url);

  if (!sessionId && isPublicPath(url.pathname)) {
    const response = await resolve(event)

    return response
  }

  // validate the user existence and if the path is acceesible
  if (!sessionId) {
    throw redirect(302, '/auth/login');
  }

  const userId = (await verifyAccessToken(sessionId)).sub

  if (userId) {
    //set the user to the locals (i explain this later on the article)
    event.locals.userId = Number(userId)

    // redirect user if he is already logged if he try to access signin or signup
    if (url.pathname == '/auth/login') {
      throw redirect(302, '/')
    }
  }

  const response = await resolve(event)

  return response
}
