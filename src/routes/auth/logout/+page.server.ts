import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';


export const actions = {
  default: async (event) => {
    event.cookies.delete('sessionid', { path: '/' });
    event.locals.userId = null;

    redirect(302, '/auth/login')
  }
} satisfies Actions;
