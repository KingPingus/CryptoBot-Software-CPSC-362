// import type { Actions } from "@sveltejs/kit";
// import { redirect } from '@sveltejs/kit';

// export const actions: Actions = {
//     default: async ({ locals, request }) => {
//         const data = Object.fromEntries(await request.formData()) as {
//             name: string;
//             email: string;
//             password: string;
//             passwordConfirm: string;
//         };

//         try {
//             await locals.pb.collection('users').create(data);
//             // await locals.pb.collection('users').authWithPassword(data.email, data.password);
//             await locals.pb.collection('users').requestVerification(data.email);
//         } catch (e) {
//             console.error(e);
//             return {
//                 error: true,
//                 message: e
//             }
//         }
//         throw redirect(303, '/login');
//     }
// };

import type { Actions } from "@sveltejs/kit";
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const data = Object.fromEntries(await request.formData()) as {
            name: string;
            email: string;
            password: string;
            passwordConfirm: string;
        };

        // Password confirmation check
        if (data.password !== data.passwordConfirm) {
            return fail(400, {
                errors: { passwordConfirm: ["Passwords do not match."] },
                values: data
            });
        }

        try {
            await locals.pb.collection('users').create({
                name: data.name,
                email: data.email,
                password: data.password
            });
            await locals.pb.collection('users').requestVerification(data.email);
        } catch (e: any) {
            // Inspect PocketBase error structure
            if (e?.data?.email?.code === "validation_not_unique") {
                return fail(400, {
                    errors: { email: ["Email is already used."] },
                    values: data
                });
            }
            // Generic fallback
            return fail(400, {
                errors: { general: ["Email address already been used."] },
                values: data
            });
        }

        throw redirect(303, '/login');
    }
}
