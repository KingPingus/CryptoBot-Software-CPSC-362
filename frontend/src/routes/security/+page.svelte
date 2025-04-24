<script lang="ts">
    import Input from '$lib/components/ui/+input.svelte';
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';

    let errorMessage: string | null = null;
    let successMessage: string | null = null;
    let loading = false;

    let oldPassword = '';
    let newPassword = '';
    let confirmPassword = '';

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
        <h3 class="text-2xl font-bold mb-4 text-gray-900">Change Password</h3>
        <form method="POST" action="?/changePassword" use:enhance={() => {
            return async ({ result }) => {
                handleSubmit();
                loading = false;
                if (result.type === 'success') {
                    successMessage = "Password changed successfully.";
                    await invalidateAll();
                    oldPassword = '';
                    newPassword = '';
                    confirmPassword = '';
                } else if (result.data?.message) {
                    errorMessage = result.data.message;
                } else {
                    errorMessage = "An unexpected error occurred.";
                }
            };
        }} class="flex flex-col space-y-4">
            <Input
                id="oldPassword"
                name="oldPassword"
                type="password"
                label="Current Password"
                bind:value={oldPassword}
                required
            />
            <Input
                id="newPassword"
                name="newPassword"
                type="password"
                label="New Password"
                bind:value={newPassword}
                required
            />
            <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                label="Confirm New Password"
                bind:value={confirmPassword}
                required
            />
            {#if errorMessage}
                <div class="text-red-500">{errorMessage}</div>
            {/if}
            {#if successMessage}
                <div class="text-green-500">{successMessage}</div>
            {/if}
            <button
                class="btn btn-primary bg-gray-100 text-gray-700 hover:bg-gray-300 rounded-full px-6 py-2 w-full"
                type="submit"
                disabled={loading}
            >
                Change Password
            </button>
        </form>
    </div>
</div>
