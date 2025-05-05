<script>
    export let form;
    import { applyAction, enhance } from '$app/forms';
    import { pb } from "$lib/pocketbase"
</script>

<form method="POST" class="card" use:enhance>
    <h1 class="text-2xl mb-8">Register</h1>
    <div class="form-row" style="display: flex; gap: 1rem;">
        <div class="field">
            <input type="text" name="name" placeholder="Name" class="input input-bordered" value={form?.values?.name || ""} />
            {#if form?.errors?.name}
                <span class="text-error">{form.errors.name[0]}</span>
            {/if}
        </div>
        <div class="field">
            <input type="email" name="email" placeholder="Email" class="input input-bordered" value={form?.values?.email || ""} />
            {#if form?.errors?.email}
                <span class="text-error">{form.errors.email[0]}</span>
            {/if}
        </div>
        <div class="field">
            <input type="password" name="password" placeholder="Password" class="input input-bordered" />
            {#if form?.errors?.password}
                <span class="text-error">{form.errors.password[0]}</span>
            {/if}
        </div>
        <div class="field">
            <input type="password" name="passwordConfirm" placeholder="Confirm Password" class="input input-bordered" />
            {#if form?.errors?.passwordConfirm}
                <span class="text-error">{form.errors.passwordConfirm[0]}</span>
            {/if}
        </div>
        <button class="btn btn-primary">Register</button>
    </div>
    {#if form?.errors?.general}
        <span class="text-error">{form.errors.general[0]}</span>
    {/if}
</form>

<style>
    .form-row {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
    }

    .field {
        display: flex;
        flex-direction: column;
        min-width: 180px;
    }

    .text-error {
        color: #e53e3e;
        font-size: 0.9em;
        margin-top: 0.25em;
    }
</style>



<!-- <script>
    export let form;
    import { enhance } from '$app/forms';
</script>

<form method="POST" class="card" use:enhance>
    <h1 class="text-2xl mb-8">Register</h1>
    <div class="form-control gap-2 mb-4">
        <input type="text" name="name" placeholder="Name" 
               class="input input-bordered" value={form?.values?.name || ""}>
        {#if form?.errors?.name}
            <span class="text-error">{form.errors.name[0]}</span>
        {/if}

        <input type="email" name="email" placeholder="Email" 
               class="input input-bordered" value={form?.values?.email || ""}>
        {#if form?.errors?.email}
            <span class="text-error">{form.errors.email[0]}</span>
        {/if}

        <input type="password" name="password" placeholder="Password" 
               class="input input-bordered">
        {#if form?.errors?.password}
            <span class="text-error">{form.errors.password[0]}</span>
        {/if}

        <input type="password" name="passwordConfirm" 
               placeholder="Confirm Password" class="input input-bordered">
        {#if form?.errors?.passwordConfirm}
            <span class="text-error">{form.errors.passwordConfirm[0]}</span>
        {/if}

        {#if form?.errors?.general}
            <span class="text-error">{form.errors.general[0]}</span>
        {/if}

        <button class="btn btn-primary">Register</button>
    </div>
</form> -->
