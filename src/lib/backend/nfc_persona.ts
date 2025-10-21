// src/lib/backend/nfc_persona.ts

import type { Json } from '../types/json';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Fetch a persona by NFC ID.
 * Returns the user profile if found, or null if not found.
 */
export async function fetchPersona(
	nfcId: string
): Promise<{ nfc_id: string; persona: Json } | null> {
	if (!nfcId) throw new Error('NFC ID is required');

	const res = await fetch(`${BACKEND_URL}/persona/${encodeURIComponent(nfcId)}`);

	if (res.status === 404) return null; // No profile found

	if (!res.ok) throw new Error(`Backend responded with ${res.status}`);

	const profile = await res.json();

	// Ensure valid shape
	if (!profile?.nfc_id || !profile?.persona) return null;

	return {
		nfc_id: profile.nfc_id,
		persona: profile.persona
	};
}

/**
 * Register a new persona for a given NFC ID.
 * `persona` is a dynamic JSON object (can have any structure).
 */
export async function registerPersona(
	nfcId: string,
	persona: Json
): Promise<{ nfc_id: string; persona: Json }> {
	if (!nfcId) throw new Error('NFC ID is required');
	if (!persona) throw new Error('Persona JSON is required');

	const res = await fetch(`${BACKEND_URL}/persona`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			uuid: nfcId,
			persona
		})
	});

	if (!res.ok) throw new Error(`Backend responded with ${res.status}`);

	return {
		nfc_id: nfcId,
		persona
	};
}

/**
 * Example structure for documentation or placeholder usage.
 * This is NOT enforced by type — persona remains dynamic.
 */
export const examplePersona: Json = {
	name: 'Jane Doe',
	age: 28,
	occupation: 'Engineer',
	hobbies: ['hiking', 'photography'],
	preferences: {
		theme: 'dark',
		notifications: true
	}
};
