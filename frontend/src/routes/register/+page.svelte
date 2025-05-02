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
    <h1 class="text-2xl mb-8">Register</h1>
    <div class="form-control gap-2 mb-4">
        <input type="name" name="name" placeholder="Name" class="input input-boredered">
        <input type="email" name="email" placeholder="Email" class="input input-boredered">
        <input type="password" name="password" placeholder="Password" class="input input-bordered">
        <input type="password" name="passwordConfirm" placeholder="Confirm Password" class="input input-bordered">
        <button class="btn btn-primary">Register</button>
    </div>
</form> -->

<script>
    export let form;
    import { applyAction, enhance } from '$app/forms';
    import { pb } from "$lib/pocketbase"
</script>

<form method="POST" class="card" use:enhance={() => {
    return async ({ result }) => {
        pb.authStore.loadFromCookie(document.cookie);
        await applyAction(result);
    }
}}>
    <h1 class="text-2xl mb-8">Register</h1>
    <div class="form-control gap-2 mb-4">
        <input type="name" name="name" placeholder="Name" class="input input-bordered" value={form?.values?.name || ""}>
        {#if form?.errors?.name}
            <span class="text-error">{form.errors.name[0]}</span>
        {/if}

        <input type="email" name="email" placeholder="Email" class="input input-bordered" value={form?.values?.email || ""}>
        {#if form?.errors?.email}
            <span class="text-error">{form.errors.email[0]}</span>
        {/if}

        <input type="password" name="password" placeholder="Password" class="input input-bordered">
        {#if form?.errors?.password}
            <span class="text-error">{form.errors.password[0]}</span>
        {/if}

        <input type="password" name="passwordConfirm" placeholder="Confirm Password" class="input input-bordered">
        {#if form?.errors?.passwordConfirm}
            <span class="text-error">{form.errors.passwordConfirm[0]}</span>
        {/if}

        {#if form?.errors?.general}
            <span class="text-error">{form.errors.general[0]}</span>
        {/if}

        <button class="btn btn-primary">Register</button>
    </div>
</form>
