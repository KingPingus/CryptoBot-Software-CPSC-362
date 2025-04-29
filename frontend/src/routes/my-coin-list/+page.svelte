<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { myCoinsList } from "$lib/stores/coinListStore.js";
  
  // Search functionality
  let searchTerm = '';
  let searchResult: any = null;
  let searchError: string | null = null;
  let isSearching = false;
  
  // Search for a cryptocurrency
  async function searchCoin() {
    if (!searchTerm) return;
    
    isSearching = true;
    searchError = null;
    searchResult = null;
    
    try {
      const res = await fetch(`http://localhost:8000/crypto/${searchTerm}`);
      if (res.ok) {
        searchResult = await res.json();
      } else if (res.status === 404) {
        searchError = `Cryptocurrency ${searchTerm.toUpperCase()} not found.`;
      } else {
        searchError = "An error occurred while fetching data.";
      }
    } catch (e) {
      searchError = "Network error or API unavailable.";
    } finally {
      isSearching = false;
    }
  }
  
  // Add coin to my list
  function addToMyCoins() {
    if (!searchResult) return;
    myCoinsList.addCoin(searchResult);
    searchResult = null;
    searchTerm = '';
  }
  
  // Remove coin from my list
  function removeCoin(symbol: string) {
    myCoinsList.removeCoin(symbol);
  }
  
  // Add a function to handle form submission
  function handleSubmit(event: Event) {
    event.preventDefault(); // Prevent page reload
    searchCoin();
  }
</script>

<svelte:head>
  <title>My Coin List</title>
</svelte:head>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-6">My Coin List</h1>
  
  <!-- Search Section -->
  <div class="bg-white p-4 rounded shadow-md mb-8">
    <h2 class="text-lg font-semibold mb-4">Add Cryptocurrency</h2>
    
    <!-- Wrap inputs in a form element -->
    <form on:submit={handleSubmit} class="flex gap-2">
      <Input 
        type="text" 
        placeholder="Enter coin symbol (e.g. BTC)" 
        bind:value={searchTerm}
        class="flex-1" 
      />
      <Button type="submit" disabled={isSearching}>
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
    </form>
    
    <!-- Search Results - keep as is -->
    {#if searchError}
      <p class="text-red-500 mt-2">{searchError}</p>
    {:else if searchResult}
      <div class="mt-4 p-3 border rounded">
        <div class="flex justify-between items-center">
          <div>
            <p class="font-semibold">{searchResult.crypto} - {searchResult.name}</p>
            <p class="text-sm text-gray-600">Price: ${searchResult.price}</p>
          </div>
          <Button variant="outline" on:click={addToMyCoins}>Add to My Coins</Button>
        </div>
      </div>
    {/if}
  </div>
  
  <!-- My Coins List -->
  <div class="bg-white p-4 rounded shadow-md">
    <h2 class="text-lg font-semibold mb-4">My Coins</h2>
    
    {#if $myCoinsList.length === 0}
      <p class="text-gray-500">You haven't added any coins to your list yet.</p>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left">Coin</th>
              <th class="p-2 text-left">Price</th>
              <th class="p-2 text-left">24h Change</th>
              <th class="p-2 text-left">Market Cap</th>
              <th class="p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {#each $myCoinsList as coin}
              <tr class="border-t">
                <td class="p-2">{coin.crypto} - {coin.name}</td>
                <td class="p-2">${coin.price}</td>
                <td class="p-2" class:text-green-500={coin['24h_change'] > 0} class:text-red-500={coin['24h_change'] < 0}>
                  {coin['24h_change'].toFixed(2)}%
                </td>
                <td class="p-2">${coin.market_cap.toLocaleString()}</td>
                <td class="p-2 text-center">
                  <Button variant="destructive" size="sm" on:click={() => removeCoin(coin.crypto)}>
                    Remove
                  </Button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>