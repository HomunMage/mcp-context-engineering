// lib/stores/status.cache.ts
import { writable } from 'svelte/store';
import { setWithTTL, getIfFresh } from '$lib/utils/cache';

// Use an effectively infinite TTL (e.g., 100 years)
const FOREVER_TTL = 1000 * 60 * 60 * 24 * 365 * 100;

// Cache key name
const CACHE_KEY = 'apiKey';

// Try to read the cached value once at init
const cachedValue = getIfFresh<string>(CACHE_KEY) ?? '';

// Create a writable store with initial value
export const apiKey = writable<string>(cachedValue);

// Persist on any change, with forever TTL
apiKey.subscribe((value) => {
	setWithTTL(CACHE_KEY, value, FOREVER_TTL);
});
