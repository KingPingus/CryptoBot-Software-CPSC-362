<!-- <script>
    import { applyAction, enhance } from '$app/forms';
    import { pb } from "$lib/pocketbase"
</script>

<form method="POST" class="card" use:enhance={() => {
    return async ({ result }) => {
        pb.authStore.loadFromCookie(document.cookie);
        await applyAction(result);
    }
}}>
    <h1 class="text-2xl mb-8">Log in</h1>
    <div class="form-control gap-2 mb-4">
        <input type="email" name="email" placeholder="Email" class="input input-boredered">
        <input type="password" name="password" placeholder="Password" class="input input-bordered">
        <button class="btn btn-primary">Log in</button>
    </div>
</form> -->

<!-- <script>
    import { applyAction, enhance } from '$app/forms';
    import { pb } from "$lib/pocketbase"

    export let form;
</script>

<form method="POST" class="card" use:enhance={() => {
    return async ({ result }) => {
        pb.authStore.loadFromCookie(document.cookie);
        await applyAction(result);
    }
}}>
    <h1 class="text-2xl mb-8">Log in</h1>
    <div class="form-control gap-2 mb-4">
        <input type="email" name="email" placeholder="Email" class="input input-boredered">
        <input type="password" name="password" placeholder="Password" class="input input-bordered">
        {#if form?.error}
            <div class="text-error text-sm mb-2">{form.error}</div>
        {/if}
        <button class="btn btn-primary">Log in</button>
    </div>
</form> -->

<script>
    import { applyAction, enhance } from '$app/forms';
    import { pb } from "$lib/pocketbase"

    export let form;
</script>

<form method="POST" class="card" use:enhance={() => {
    return async ({ result }) => {
        pb.authStore.loadFromCookie(document.cookie);
        await applyAction(result);
    }
}}>
    <h1 class="text-2xl mb-8">Log in</h1>
    <div class="form-control gap-2">
        <input type="email" name="email" placeholder="Email" class="input input-bordered">
        <input type="password" name="password" placeholder="Password" class="input input-bordered">
        
        {#if form?.error}
            <div class="text-error text-sm min-h-5">
                {form.error}
            </div>
        {:else}
            <div class="min-h-5"></div> <!-- Invisible spacer -->
        {/if}

        <button class="btn btn-primary">Log in</button>
    </div>
</form>
