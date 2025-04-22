<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  let data = {trending_coins:[]};
  let intervalId: NodeJS.Timeout;

  async function fetchData() {
    console.log('Fetching data from the backend...');
    const response = await fetch('http://localhost:8000/trending');
    console.log('Response:', response);

    if (response.ok) {
      const result = await response.json();
      data = result;
      console.log('Data received:', data);
    } else {
      console.error('Failed to fetch data:', response.statusText);
    }
  }

  onMount(() => {
    fetchData();

    intervalId = setInterval(() => {
      fetchData();
    }, 2000);
  });

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>

<style>
  .market-table {
    width: 100%;
    border-collapse: collapse;
  }

  .market-table th,
  .market-table td {
    padding: 0.75rem;
    border: 1px solid #ccc;
    text-align: left;
  }

  .market-table thead {
    background-color: #f3f3f3;
  }

  .positive {
    color: green;
  }

  .negative {
    color: red;
  }
</style>

<div class="flex items-center">
  <h1 class="text-lg font-semibold md:text-2xl">Top Coins Today</h1>
</div>

<div class="overflow-x-auto">
  {#if data.trending_coins && data.trending_coins.length > 0}
    <table class="market-table">
      <thead>
        <tr>
          <th>Coin</th>
          <th>Price</th>
          <th>24H Change</th>
          <th>Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {#each data.trending_coins as coin (coin.symbol)}
          <tr>
            <td>{coin.name}</td>
            <td>${coin.price?.toFixed(2)}</td>
            <td class={coin["24h_change"] > 0 ? 'positive' : 'negative'}>
              {coin["24h_change"]?.toFixed(2)}%
            </td>
            <td>${coin.market_cap?.toLocaleString()}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {:else}
    <p>Loading...</p>
  {/if}
</div>
