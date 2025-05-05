// import type { Actions } from "@sveltejs/kit";
// import { fail, redirect } from '@sveltejs/kit';

// export const actions: Actions = {
//     default: async ({ locals, request }) => {
//         const data = Object.fromEntries(await request.formData()) as {
//             name: string;
//             email: string;
//             password: string;
//             passwordConfirm: string;
//         };

//         if (data.password !== data.passwordConfirm) {
//             return fail(400, {
//                 errors: { passwordConfirm: ["Passwords do not match."] },
//                 values: data
//             });
//         }

//         try {
//             await locals.pb.collection('users').create({
//                 name: data.name,
//                 email: data.email,
//                 password: data.password
//             });
//             await locals.pb.collection('users').requestVerification(data.email);
//         } catch (e: any) {
//             if (e?.data?.email?.code === "validation_not_unique") {
//                 return fail(400, {
//                     errors: { email: ["Email address already been used."] },
//                     values: data
//                 });
//             }
//             return fail(400, {
//                 errors: { general: ["Email address already been used."] },
//                 values: data
//             });
//         }

//         throw redirect(303, '/login');
//     }
// }

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
                password: data.password,
                passwordConfirm: data.passwordConfirm
            });
            
            await locals.pb.collection('users').requestVerification(data.email);
        } catch (e: any) {
            const errors: Record<string, string[]> = {};
        
            if (e?.data?.data?.email?.code === "validation_not_unique") {
                errors.email = ["Email address already in use."];
            } else if (e?.data?.data) {
                Object.entries(e.data.data).forEach(([key, val]) => {
                    if (typeof val === 'object' && val !== null && 'message' in val) {
                        errors[key] = [val.message];
                    } else if (typeof val === 'string') {
                        errors[key] = [val];
                    } else {
                        errors[key] = ['Unknown error'];
                    }
                });
            } else {
                errors.general = [e?.data?.message || "Registration failed. Please try again."];
            }
        

            return fail(400, { errors, values: data });
        }

        throw redirect(303, '/login');
    }
};
