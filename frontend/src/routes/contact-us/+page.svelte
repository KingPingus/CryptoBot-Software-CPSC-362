<script lang="ts">
    import { faTwitter, faTelegram, faGithub } from '@fortawesome/free-brands-svg-icons';
    import Fa from 'svelte-fa';

    let name = "";
    let email = "";
    let message = "";
    let submitted = false;
    let error = "";

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !message) {
            error = "Please fill out all fields.";
            return;
        }
        submitted = true;
        error = "";
    }
</script>

<div class="flex flex-col items-center w-full min-h-screen bg-gray-50 py-12 px-4">
    <div class="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Contact Crypto Market Bot</h1>
        <p class="text-gray-600 mb-6">
            Have a question, feedback, or need support? Reach out to us and our team will get back to you within 24 hours.
        </p>
        <div class="mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <div class="font-semibold text-gray-800">Email</div>
                    <div class="text-gray-700">support@cryptomarketbot.com</div>
                    <div class="font-semibold text-gray-800 mt-2">Phone</div>
                    <div class="text-gray-700">+1 (555) 123-4567</div>
                </div>
                <div class="md:text-right">
                    <div class="font-semibold text-gray-800">Address</div>
                    <div class="text-gray-700">123 Blockchain Ave, Suite 100<br/>San Francisco, CA 94105</div>
                </div>
            </div>
            <div class="flex space-x-4 mt-6">
                <a href="https://twitter.com/cryptomarketbot" class="text-gray-600 hover:text-blue-500 transition" target="_blank">
                    <Fa icon={faTwitter} class="h-6 w-6" />
                </a>
                <a href="https://t.me/cryptomarketbot" class="text-gray-600 hover:text-blue-500 transition" target="_blank">
                    <Fa icon={faTelegram} class="h-6 w-6" />
                </a>
                <a href="https://github.com/cryptomarketbot" class="text-gray-600 hover:text-blue-500 transition" target="_blank">
                    <Fa icon={faGithub} class="h-6 w-6" />
                </a>
            </div>
        </div>
        <form class="space-y-4" on:submit={handleSubmit}>
            <div>
                <label class="block text-gray-700 font-medium mb-1" for="name">Name</label>
                <input class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    id="name" type="text" bind:value={name} required />
            </div>
            <div>
                <label class="block text-gray-700 font-medium mb-1" for="email">Email</label>
                <input class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    id="email" type="email" bind:value={email} required />
            </div>
            <div>
                <label class="block text-gray-700 font-medium mb-1" for="message">Message</label>
                <textarea class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    id="message" rows="5" bind:value={message} required></textarea>
            </div>
            {#if error}
                <div class="text-red-500">{error}</div>
            {/if}
            {#if submitted}
                <div class="text-green-600 font-medium">Thank you for contacting us! We'll get back to you soon.</div>
            {:else}
                <button
                    class="bg-blue-600 text-white font-semibold rounded-full px-6 py-2 hover:bg-blue-700 transition"
                    type="submit"
                >
                    Send Message
                </button>
            {/if}
        </form>
    </div>
</div>
