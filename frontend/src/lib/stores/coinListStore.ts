import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create a writable store with initial value from localStorage or empty array
const createCoinListStore = () => {
  // Only access localStorage in browser environment
  const initialValue = browser ? 
    JSON.parse(localStorage.getItem('myCoinsList') || '[]') : 
    [];
    
  const { subscribe, set, update } = writable(initialValue);

  return {
    subscribe,
    // Add a coin to the list
    addCoin: (coin) => {
      update(coins => {
        // Check if coin already exists
        const exists = coins.some(c => c.crypto === coin.crypto);
        if (!exists) {
          const updatedCoins = [...coins, coin];
          if (browser) localStorage.setItem('myCoinsList', JSON.stringify(updatedCoins));
          return updatedCoins;
        }
        return coins;
      });
    },
    // Remove a coin from the list
    removeCoin: (symbol) => {
      update(coins => {
        const filteredCoins = coins.filter(coin => coin.crypto !== symbol);
        if (browser) localStorage.setItem('myCoinsList', JSON.stringify(filteredCoins));
        return filteredCoins;
      });
    },
    // Clear the entire list
    clearList: () => {
      if (browser) localStorage.removeItem('myCoinsList');
      set([]);
    }
  };
};

export const myCoinsList = createCoinListStore();