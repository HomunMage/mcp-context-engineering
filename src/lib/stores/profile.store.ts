// lib/stores/profile.store.ts

import { writable } from 'svelte/store';
import type { Json } from '../types/json';

export type User = {
	nfc_id: string;
	persona: Json;
} | null;

export const userStore = writable<User>(null);
