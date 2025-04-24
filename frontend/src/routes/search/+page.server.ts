import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const symbol = url.searchParams.get('symbol');
    if (!symbol) {
        throw redirect(302, '/');
    }
    return {
        symbol: symbol
    };
};
