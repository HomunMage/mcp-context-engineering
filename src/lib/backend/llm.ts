// src/lib/backend/llm.ts

interface GeminiResponse {
	candidates: Array<{
		content: {
			parts: Array<{
				text: string;
			}>;
			role: string;
		};
		finishReason: string;
		index: number;
	}>;
}

export async function ChatWithGemini(apiKey: string, prompt: string): Promise<string> {
	const url =
		'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'x-goog-api-key': apiKey,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			contents: [
				{
					parts: [
						{
							text: prompt
						}
					]
				}
			]
		})
	});

	if (!response.ok) {
		throw new Error(`API request failed: ${response.status} ${response.statusText}`);
	}

	const data: GeminiResponse = await response.json();

	// Return the first part's text
	return data.candidates[0]?.content.parts[0]?.text || '';
}
