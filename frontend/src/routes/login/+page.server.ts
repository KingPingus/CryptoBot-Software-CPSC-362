import type { Actions } from "@sveltejs/kit";
import { redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries(await request.formData()) as {
      email: string;
      password: string;
    };

    try {
      await locals.pb.collection('users').authWithPassword(data.email, data.password);
    } catch (e) {
      if (e instanceof ClientResponseError) {
        const isEmailNotFound = e.data?.email?.code === 'validation_invalid_email';
        const isWrongPassword = e.data?.password?.code === 'validation_invalid_password';
        
        const message = isEmailNotFound 
          ? "No account found." 
          : isWrongPassword
            ? "Password does not match."
            : "Invalid credentials.";

        return { error: message };
      }
      return { error: "Login failed. Please try again." };
    }
    
    throw redirect(303, '/');
  }
};
