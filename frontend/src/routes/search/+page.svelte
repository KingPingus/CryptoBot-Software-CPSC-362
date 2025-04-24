<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
  
    let symbol: string | null = null;
    let searchResult: any = null;
    let error: string | null = null;
  
    onMount(async () => {
      symbol = $page.url.searchParams.get('symbol');
      console.log('Symbol from URL:', symbol);
  
      if (symbol) {
        try {
          const res = await fetch(`http://localhost:8000/crypto/${symbol}`);
          if (res.ok) {
            searchResult = await res.json();
            error = null;
            console.log('Search Result:', searchResult);
          } else if (res.status === 404) {
            searchResult = null;
            error = `Cryptocurrency ${symbol.toUpperCase()} not found.`;
          } else {
            searchResult = null;
            error = "An error occurred while fetching data.";
          }
        } catch (e) {
          searchResult = null;
          error = "Network error or API unavailable.";
        }
      }
    });
  </script>
  
  <svelte:head>
    <title>Search Result</title>
  </svelte:head>
  
  <div class="container mx-auto mt-8">
    {#if error}
      <p class="text-red-500">{error}</p>
    {:else if searchResult}
      <div class="p-4 border rounded shadow-md">
        <h2 class="text-xl font-semibold">
          {searchResult.crypto} - {searchResult.name}
        </h2>
        <p>Price: ${searchResult.price}</p>
        <p>Market Cap: ${searchResult.market_cap}</p>
        <p>24 Hour Change: {searchResult['24h_change']}</p>
        <p>Circulating Supply: {searchResult.circulating_supply}</p>
        <p>Total Supply: {searchResult.total_supply}</p>
      </div>
    {:else if symbol}
      <p>Searching for {symbol.toUpperCase()}...</p>
    {/if}
  </div>
  