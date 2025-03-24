import { redirect } from '@sveltejs/kit';

export const POST = async ({ cookies }) => {
  cookies.delete('access', { path: '/' });

  throw redirect(302, '/');
};
