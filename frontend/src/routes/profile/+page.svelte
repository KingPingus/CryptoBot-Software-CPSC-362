<!-- <script lang="ts">
  import Input from '$lib/components/ui/+input.svelte';
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let data: PageData;

  let name = data?.user?.name || '';
  let errorMessage: string | null = null;
  let successMessage: string | null = null;

  const clearMessages = () => {
    errorMessage = null;
    successMessage = null;
  };

  let timeoutId: NodeJS.Timeout;

  $: if (successMessage) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      successMessage = null;
    }, 2000);
  }

  const handleSubmit = () => {
    errorMessage = null;
    successMessage = null;
  };
</script>

<div class="flex flex-col w-full h-full">
  <form method="POST" action="?/updateProfile" use:enhance={() => {
    return async ({ result }) => {
      handleSubmit();
      if (result.type === 'success') {
        successMessage = "Name changed.";
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            successMessage = null;
        }, 2000);
        await invalidateAll();
      } else if (result.data?.message) {
        errorMessage = result.data.message;
      } else {
        errorMessage = "An unexpected error occurred.";
      }
    };
  }} class="flex flex-col space-y-2 w-full max-w-xs">
    <h3 class="text-2xl font-medium">Update Profile</h3>
    <Input id="name" label="Name" bind:value={name} />
    <input type="hidden" name="id" value={data?.user?.id || ''} />
    {#if errorMessage}
        <div class="text-red-500">{errorMessage}</div>
    {/if}
    {#if successMessage}
        <div class="text-green-500">{successMessage}</div>
    {/if}
    <div class="w-full max-w-lg pt-3">
        <button class="btn btn-primary w-full max-w-lg" type="submit">
            Update Profile
        </button>
    </div>
  </form>
</div> -->
<script lang="ts">
  import Input from '$lib/components/ui/+input.svelte';
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';

  export let data: PageData;

  let name = data?.user?.name || '';
  let errorMessage: string | null = null;
  let successMessage: string | null = null;

  const clearMessages = () => {
    errorMessage = null;
    successMessage = null;
  };

  let timeoutId: NodeJS.Timeout;

  $: if (successMessage) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      successMessage = null;
    }, 2000);
  }

  const handleSubmit = () => {
    errorMessage = null;
    successMessage = null;
  };
</script>

<div class="flex flex-col w-full h-full px-4 py-8 max-w-xl mx-auto">
    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
        <h3 class="text-2xl font-bold mb-4 text-gray-900">Update Profile</h3>
        <form method="POST" action="?/updateProfile" use:enhance={() => {
            return async ({ result }) => {
                handleSubmit();
                if (result.type === 'success') {
                    successMessage = "Name changed.";
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        successMessage = null;
                    }, 2000);
                    await invalidateAll();
                } else if (result.data?.message) {
                    errorMessage = result.data.message;
                } else {
                    errorMessage = "An unexpected error occurred.";
                }
            };
        }} class="flex flex-col space-y-4">
            <Input id="name" label="Name" bind:value={name} />
            <input type="hidden" name="id" value={data?.user?.id || ''} />
            {#if errorMessage}
                <div class="text-red-500">{errorMessage}</div>
            {/if}
            {#if successMessage}
                <div class="text-green-500">{successMessage}</div>
            {/if}
            <button class="btn btn-primary bg-gray-100 text-gray-700 hover:bg-gray-300 rounded-full px-6 py-2 w-full" type="submit">
                Update Profile
            </button>
        </form>
    </div>
</div>
