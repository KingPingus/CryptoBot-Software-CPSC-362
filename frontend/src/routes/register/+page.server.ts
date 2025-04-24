import type { Actions } from "@sveltejs/kit";
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const data = Object.fromEntries(await request.formData()) as {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
        };

        try {
            await locals.pb.collection('users').create(data);
            // await locals.pb.collection('users').authWithPassword(data.email, data.password);
            await locals.pb.collection('users').requestVerification(data.email);
        } catch (e) {
            console.error(e);
            return {
                error: true,
                message: e
            }
        }
        throw redirect(303, '/login');
    }
};
