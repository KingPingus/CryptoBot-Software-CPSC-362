<script lang="ts">
  import CircleUser from "lucide-svelte/icons/circle-user";
  import Package from "lucide-svelte/icons/package";
  import House from "lucide-svelte/icons/house";
  import ShoppingCart from "lucide-svelte/icons/shopping-cart";
  import Bell from "lucide-svelte/icons/bell";
  import Menu from "lucide-svelte/icons/menu";
  import Bot from "lucide-svelte/icons/bot";
  import Search from "lucide-svelte/icons/search";
  import Users from "lucide-svelte/icons/users";
  import Headset from "lucide-svelte/icons/headset";
  import Settings from "lucide-svelte/icons/settings";
  import UserPen from "lucide-svelte/icons/user-pen";
  import { LogOut } from "lucide-svelte";

  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { page } from '$app/state';
  import * as Sheet from "$lib/components/ui/sheet/index.js";

  import { applyAction, enhance } from '$app/forms';
  import { currentUser } from '$lib/pocketbase';
  import { pb } from "$lib/pocketbase"

  // async function logout() {
  //   await fetch('/logout', { method: 'POST' });
  //   window.location.href = '/';
  // }
</script>

<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
  <div class="bg-muted/40 hidden border-r md:block">
    <div class="flex h-full max-h-screen flex-col gap-2">
      <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <a href="/" class="flex items-center gap-2 font-semibold">
          <Bot class="h-6 w-6" />
          <span class="">Crypto Market Bot</span>
        </a>
        <!-- <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
          <Bell class="h-4 w-4" />
          <span class="sr-only">Toggle notifications</span>
        </Button> -->
      </div>
      <div class="flex-1">
        <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
          <!-- <a
            href="/dashboard"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <House class="h-4 w-4" />
            Home
          </a> -->
          <a
            href="##"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <UserPen class="h-4 w-4" />
            Profile
          </a>
          <a
            href="##"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <Settings class="h-4 w-4" />
            Settings
          </a>
          <a
            href="##"
            class="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
          >
            <LogOut class="h-4 w-4" />
            <form method="POST" action="/logout" use:enhance={() => {
              return async ({ result }) => {
                  pb.authStore.clear();
                  await applyAction(result);
              };
              }}>
              <button class="btn">Log out</button>
            </form>
          </a>
        </nav>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <Sheet.Root>
        <Sheet.Trigger asChild let:builder>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0 md:hidden"
            builders={[builder]}
          >
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </Sheet.Trigger>
        <Sheet.Content side="left" class="flex flex-col">
          <nav class="grid gap-2 text-lg font-medium">
            <a
              href="##"
              class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <House class="h-5 w-5" />
              Dashboard
            </a>
            <a
              href="##"
              class="bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <ShoppingCart class="h-5 w-5" />
              Orders
              <Badge
                class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              >
                6
              </Badge>
            </a>
            <a
              href="##"
              class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <Package class="h-5 w-5" />
              Products
            </a>
            <a
              href="##"
              class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <Users class="h-5 w-5" />
              Customers
            </a>
            <a
              href="##"
              class="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
            >
              <Headset class="h-5 w-5" />
              Contact Us
            </a>
          </nav>
        </Sheet.Content>
      </Sheet.Root>
      <div class="w-full flex-1">
        <form>
          <div class="relative">
            <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search coins..."
              class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="secondary"
            size="icon"
            class="rounded-full"
          >
            <CircleUser class="h-5 w-5" />
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>
            <a href="/account" 
              aria-current={page.url.pathname === '/account' ? 'page' : undefined}>
              <button type="button">Profile</button>
            </a>
            </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item><button type="button">Settings</button></DropdownMenu.Item>
          <DropdownMenu.Item><button type="button">Support</button></DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>
            <form method="POST" action="/logout" use:enhance={() => {
              return async ({ result }) => {
                  pb.authStore.clear();
                  await applyAction(result);
              };
              }}>
              <button class="btn">Log out</button>
            </form>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </header>
    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">Profile</h1>
      </div>
      
    </main>
  </div>
</div>
      <!-- <div class="navbar-end">
        <ul class="menu">
          {#if $currentUser}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild let:builder>
                <Button
                  builders={[builder]}
                  variant="secondary"
                  size="icon"
                  class="rounded-full"
                >
                  <CircleUser class="h-5 w-5" />
                  <span class="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content align="end">
                <DropdownMenu.Label>
                  <a
                    href="/account"
                    aria-current={page.url.pathname === '/account' ? 'page' : undefined}
                  >
                    <button type="button">Profile</button>
                  </a>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item><button type="button">Settings</button></DropdownMenu.Item>
                <DropdownMenu.Item><button type="button">Support</button></DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  <form method="POST" action="/logout" use:enhance={() => {
                    return async ({ result }) => {
                        pb.authStore.clear();
                        await applyAction(result);
                    };
                    }}>
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
      <div class="flex items-center">
        <h1 class="text-lg font-semibold md:text-2xl">Coin List</h1>
      </div>
      <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div class="flex flex-col items-center gap-1 text-center">
          <table class="market-table">
            <thead>
              <tr>
                <th>#Rank</th>
                <th>Token Name</th>
                <th>Price(USD)</th>
                <th>Volume(USD)</th>
                <th>Market Cap(USD)</th>
                <th>24h Change</th>
              </tr>
            </thead>
            <tbody>
              {#each data as coin, index}
                <tr>
                  <td>{index + 1}</td>
                  <td>{coin.name}</td>
                  <td>${coin.quote.USD.price.toFixed(2)}</td>
                  <td>${coin.quote.USD.volume_24h.toLocaleString()}</td>
                  <td>${coin.quote.USD.market_cap.toLocaleString()}</td>
                  <td class="{coin.quote.USD.percent_change_24h > 0 ? 'positive' : 'negative'}">
                    {coin.quote.USD.percent_change_24h.toFixed(2)}%
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
      </main>
  </div>
</div> -->