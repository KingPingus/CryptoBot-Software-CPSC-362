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
    changePassword: async ({ request, locals }) => {
        const formData = await request.formData();
        const oldPassword = formData.get('oldPassword') as string;
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        if (!oldPassword || !newPassword || !confirmPassword) {
            return fail(400, { message: 'All fields are required.' });
        }
        if (newPassword !== confirmPassword) {
            return fail(400, { message: 'New passwords do not match.' });
        }

        try {
            if (!locals?.pb?.authStore?.model?.id) {
                return fail(401, { message: 'Unauthorized' });
            }
            const userId = locals.pb.authStore.model.id;

            await pb.collection('users').update(userId, {
                password: newPassword,
                passwordConfirm: confirmPassword,
                oldPassword: oldPassword
            });

            return { success: true };
        } catch (error: any) {
            return fail(400, { message: error.message || 'Failed to change password.' });
        }
    }
};
