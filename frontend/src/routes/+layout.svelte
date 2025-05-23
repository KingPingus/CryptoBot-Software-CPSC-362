<script lang="ts">
	import "../app.css";
	import CircleUser from "lucide-svelte/icons/circle-user";
	import ChartLine from "lucide-svelte/icons/chart-line";
	import Bell from "lucide-svelte/icons/bell";
	import BellOff from "lucide-svelte/icons/bell-off";
	import Bot from "lucide-svelte/icons/bot";
	import Search from "lucide-svelte/icons/search";
	import Coins from "lucide-svelte/icons/coins";
	import Headset from "lucide-svelte/icons/headset";
	import ListPlus from "lucide-svelte/icons/list-plus";

	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { currentUser } from '$lib/pocketbase';
	import { pb } from "$lib/pocketbase";
	import { goto } from '$app/navigation';
	import { scale } from "svelte/transition";
    import { quintOut } from "svelte/easing";

	let searchTerm = "";
	let notificationsMuted = false;

	function searchCrypto() {
		if (searchTerm) {
			goto(`/search?symbol=${searchTerm}`);
		}
	}

	// const navigation = [
	// 	{ title: 'Dashboard', href: '/', icon: ChartLine },
	// 	{ title: 'Trending Coins', href: '/coin-list', icon: Coins },
	// 	{ title: 'My Coin List', href: '/my-coin-list', icon: ListPlus },
	// 	{ title: 'Contact Us', href: '/contact-us', icon: Headset }
	// ];
	const baseNavigation = [
		{ title: 'Dashboard', href: '/', icon: ChartLine },
		{ title: 'Trending Coins', href: '/coin-list', icon: Coins }
  	];

	const authNavigation = [
		{ title: 'My Coin List', href: '/my-coin-list', icon: ListPlus },
		{ title: 'Contact Us', href: '/contact-us', icon: Headset }
	];

	const contactOnly = [
		{ title: 'Contact Us', href: '/contact-us', icon: Headset }
	];

	$: navigation = [
		...baseNavigation,
		...($currentUser ? authNavigation : contactOnly)
	];
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
	<div class="bg-muted/40 hidden border-r md:block">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<Bot class="h-6 w-6" />
					<span>Crypto Market Bot</span>
				</a>
				<Button 
					variant="outline" 
					size="icon" 
					class="ml-auto h-8 w-8"
					on:click={() => notificationsMuted = !notificationsMuted}
				>
					{#if notificationsMuted}
						<span in:scale={{ duration: 200, easing: quintOut }} out:scale={{ duration: 150 }}>
							<BellOff class="h-4 w-4" />
						</span>
					{:else}
						<span in:scale={{ duration: 200, easing: quintOut }} out:scale={{ duration: 150 }}>
							<Bell class="h-4 w-4" />
						</span>
					{/if}
					<span class="sr-only">{notificationsMuted ? 'Unmute' : 'Mute'} notifications</span>
				</Button>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					{#each navigation as item}
						<a
							href={item.href}
							class="{$page.url.pathname === item.href
								? 'bg-muted text-primary'
								: 'text-muted-foreground'} hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
						>
							<svelte:component this={item.icon} class="h-4 w-4" />
							{item.title}
						</a>
					{/each}
				</nav>
			</div>
		</div>
	</div>

	<div class="flex flex-col">
		<header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
			<div class="w-full flex-1">
				<form on:submit|preventDefault={searchCrypto}>
					<div class="relative">
						<Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
						<Input
							type="search"
							placeholder="Search coins..."
							class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
							bind:value={searchTerm}
						/>
					</div>
				</form>
			</div>
			<div class="navbar-end">
				<ul class="menu">
					{#if $currentUser}
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
									<CircleUser class="h-5 w-5" />
									<span class="sr-only">Toggle user menu</span>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end" class="bg-white">
								<DropdownMenu.Label>
									<a
										href="/profile"
										aria-current={$page.url.pathname === '/profile' ? 'page' : undefined}
									>
										<button type="button">Profile</button>
									</a>
								</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>
									<a
										href="/account"
										aria-current={$page.url.pathname === '/profile' ? 'page' : undefined}
									>
										<button type="button">Account</button>
									</a>
								</DropdownMenu.Item>
								<DropdownMenu.Item>
									<a
										href="/security"
										aria-current={$page.url.pathname === '/profile' ? 'page' : undefined}
									>
										<button type="button">Security</button>
									</a>
								</DropdownMenu.Item>
								<DropdownMenu.Separator />
								<DropdownMenu.Item>
									<form
										method="POST"
										action="/logout"
										use:enhance={() => {
											return async ({ result }) => {
												pb.authStore.clear();
												await applyAction(result);
											};
										}}
									>
										<button class="btn">Log out</button>
									</form>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					{:else}
						<li><a href="/login" class="btn">Login</a></li>
						<li><a href="/register" class="btn">Register</a></li>
					{/if}
				</ul>
			</div>
		</header>

		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<slot />
		</main>
	</div>
	<footer class="fixed bottom-0 left-0 mx-2 mb-1 text-[9px] text-muted-foreground select-none whitespace-nowrap max-w-full overflow-hidden">
		© {new Date().getFullYear()} Crypto Market Bot. All rights reserved.
	</footer>
</div>

<style>
	.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
	}

	button {
		transition: transform 0.1s ease;
	}

	button:active {
		transform: scale(0.95);
	}
</style>