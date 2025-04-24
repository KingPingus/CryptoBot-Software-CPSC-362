<script>
    export let open = false;
</script>

{#if open}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
            <button
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
                on:click={() => (open = false)}
                aria-label="Close"
            >×</button>
            <div>
                <slot name="heading" />
            </div>
            <div class="my-4">
                <slot />
            </div>
        </div>
    </div>
{/if}