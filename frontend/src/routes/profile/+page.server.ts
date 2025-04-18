import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { pb } from '$lib/pocketbase';

export const load: PageServerLoad = async () => {
  try {
    const user = structuredClone(pb.authStore.model); // Clone the user object
    return { user };
  } catch (err) {
    console.error('Error fetching user data:', err);
    return { user: null };
  }
};

export const actions: Actions = {
  updateProfile: async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const id = formData.get('id') as string;

    if (!name) {
      return fail(400, { message: 'Name is required' });
    }

    try {
      await pb.collection('users').update(id, { name });
      return { success: true }; // Indicate success
    } catch (error: any) {
      console.error('Error updating profile:', error);

      let message = 'Failed to update profile';

      if (error && error.message) {
          message = error.message
      }

      return { success: false, message };
    }
  }
};
