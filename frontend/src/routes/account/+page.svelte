<script lang="ts">
    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import Modal from '$lib/components/ui/+Modal.svelte';
    import Input from '$lib/components/ui/+input.svelte';

    export let form: any;
    export let data: any;
    let emailModalOpen = false;
    let usernameModalOpen = false;
    let loading = false;

    const submitUpdateEmail = () => {
        loading = true;
        return async ({ result }) => {
            switch (result.type) {
                case 'success':
                    await invalidateAll();
                    emailModalOpen = false;
                    break;
                case 'error':
                    break;
                default:
                    await applyAction(result);
            }
            loading = false;
        };
    };

    const submitUpdateUsername = () => {
        loading = true;
        return async ({ result }) => {
            switch (result.type) {
                case 'success':
                    await invalidateAll();
                    usernameModalOpen = false;
                    break;
                case 'error':
                    break;
                default:
                    await applyAction(result);
            }
            loading = false;
        };
    };
</script>

<div class="flex flex-col w-full h-full gap-8 px-4 py-8 max-w-xl mx-auto">
    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
        <h3 class="text-2xl font-bold mb-2 text-gray-900">Change Email</h3>
        <p class="mb-4 text-gray-700">Current email: <span class="font-semibold">{data?.user?.email}</span></p>
        <button class="btn btn-primary mb-2 bg-gray-100 text-gray-700 hover:bg-gray-300 rounded-full px-6 py-2" on:click={() => (emailModalOpen = true)}>Change Email</button>
        <Modal label="change-email" bind:open={emailModalOpen}>
            <h3 slot="heading" class="text-xl font-bold text-gray-900 mb-4">Change Your Email</h3>
            <form action="?/updateEmail" method="POST" class="space-y-4" use:enhance={submitUpdateEmail}>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    label="Enter your new email address"
                    required={true}
                    value={form?.data?.email}
                    disabled={loading}
                />
                <input type="hidden" name="id" value={data?.user?.id} />
                <button type="submit" class="btn btn-primary w-full bg-gray-100 text-gray-700 hover:bg-gray-300 rounded-full px-6 py-2" disabled={loading}>
                    Change my email
                </button>
            </form>
        </Modal>
    </div>

    <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
        <h3 class="text-2xl font-bold mb-2 text-gray-900">Change Username</h3>
        <Input id="username" label="Current Username" value={data?.user?.username} disabled class="mb-4" />
        <button class="btn btn-primary mb-2 bg-gray-100 text-gray-700 hover:bg-gray-300 rounded-full px-6 py-2" on:click={() => (usernameModalOpen = true)}>Change Username</button>
        <Modal label="change-username" bind:open={usernameModalOpen}>
            <h3 slot="heading" class="text-xl font-bold text-gray-900 mb-4">Change Your Username</h3>
            <form
                action="?/updateUsername"
                method="POST"
                class="space-y-4"
                use:enhance={submitUpdateUsername}
            >
                <Input
                    id="username"
                    name="username"
                    type="text"
                    label="Enter your new username"
                    required={true}
                    value={form?.data?.username}
                    disabled={loading}
                />
                <input type="hidden" name="id" value={data?.user?.id} />
                <button type="submit" class="btn btn-primary w-full bg-gray-100 text-gray-700 hover:bg-gray-300 rounded-full px-6 py-2" disabled={loading}>
                    Change my username
                </button>
            </form>
        </Modal>
    </div>
</div>