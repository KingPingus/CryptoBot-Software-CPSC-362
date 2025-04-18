<script lang="ts">
    import Input from '$lib/components/ui/+input.svelte';
    import type { PageData } from './$types'; // Import PageData type
    
    export let data: PageData; // Explicitly type data
  
    let loading = false;
    let name = data?.user?.name || '';
    let success = false;
    let errorMessage: string | null = null; // Define type for errorMessage
  
    let formElement: HTMLFormElement; // Define formElement
  
    async function updateProfile() {
      loading = true;
      errorMessage = null;
      success = false;
  
      try {
        if (!formElement) {
          errorMessage = 'Form not found.';
          return;
        }
  
        const response = await fetch('?/updateProfile', {
          method: 'POST',
          body: new FormData(formElement), // Use the bound form element
        });
  
        const result = await response.json();
  
        if (result.success) {
          success = true;
          if (data?.user) {
            data.user.name = name; // Update the displayed name if data exists
          }
        } else {
          errorMessage = result.message || 'Failed to update profile';
        }
      } catch (error: any) {
        console.error('Error updating profile:', error);
        errorMessage = error.message || 'Failed to update profile';
      } finally {
        loading = false;
      }
    }
  </script>
  
  <div class="flex flex-col w-full h-full">
    <form bind:this={formElement} on:submit|preventDefault={updateProfile} class="flex flex-col space-y-2 w-full">
      <h3 class="text-2xl font-medium">Update Profile</h3>
      <Input id="name" label="Name" bind:value={name} disabled={loading} />
      <input type="hidden" name="id" value={data?.user?.id || ''} />
      {#if errorMessage}
        <div class="text-red-500">{errorMessage}</div>
      {/if}
      {#if success}
        <div class="text-green-500">Profile updated successfully!</div>
      {/if}
      <div class="w-full max-w-lg pt-3">
        <button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>
          {#if loading}
            Updating...
          {:else}
            Update Profile
          {/if}
        </button>
      </div>
    </form>
  </div>
  