import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies, request }) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");

        if (email == "admin@gmail.com" && password == "password") {
            cookies.set("access", "true", { path: "/", sameSite: "strict" });
            throw redirect(302, "/dashboard");
        }

        return {
            email,
            message: "Email or password is not valid.",
        };
    },
};