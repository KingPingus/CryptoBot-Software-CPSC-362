import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    const access = cookies.get('access');

    if (access !== 'true') {
        throw redirect(302, '/');
    }

    return {};
};
