import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load: PageServerLoad = async ({ locals }) => {
    try {
        const user = structuredClone(pb.authStore.model);
        return { user };
    } catch (err) {
        return { user: null };
    }
};

export const actions: Actions = {
    updateEmail: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email') as string;
        const id = formData.get('id') as string;

        if (!email) {
            return fail(400, { message: 'Email is required' });
        }

        try {
            await pb.collection('users').requestEmailChange(id, { email });
            return { success: true };
        } catch (error: any) {
            return { success: false, message: error.message || 'Failed to request email.' };
        }
    },

    updateUsername: async ({ request }) => {
        const formData = await request.formData();
        const username = formData.get('username') as string;
        const id = formData.get('id') as string;

        if (!username) {
            return fail(400, { message: 'Username is required' });
        }

        try {
            await pb.collection('users').update(id, { username });
            return { success: true };
        } catch (error: any) {
            return { success: false, message: error.message || 'Failed to update username.' };
        }
    }
};