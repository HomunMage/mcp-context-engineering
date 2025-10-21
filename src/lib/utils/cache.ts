// lib/utils/cache.ts

interface Cached<T> {
	data: T;
	timestamp: number;
}

const DEFAULT_TTL = 1000 * 60 * 5; // 5 minutes

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

export function setWithTTL<T>(key: string, data: T, ttl = DEFAULT_TTL) {
	if (!isBrowser) return;

	const obj: Cached<T> = { data, timestamp: Date.now() + ttl };
	localStorage.setItem(key, JSON.stringify(obj));
}

export function getIfFresh<T>(key: string): T | null {
	if (!isBrowser) return null;

	const raw = localStorage.getItem(key);
	if (!raw) return null;

	try {
		const obj = JSON.parse(raw) as Cached<T>;
		if (Date.now() < obj.timestamp) {
			return obj.data;
		} else {
			localStorage.removeItem(key);
			return null;
		}
	} catch (e) {
		console.warn('bad cache format', e);
		localStorage.removeItem(key);
		return null;
	}
}
