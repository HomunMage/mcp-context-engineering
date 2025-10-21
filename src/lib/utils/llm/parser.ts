// lib/utils/llm/parser.ts

/**
 * parseLLMJson
 * Extracts and parses the JSON block from an LLM response string.
 *
 * The function looks for text between ```json and ``` delimiters,
 * removes newlines, and returns the parsed JSON object.
 *
 * @param input - The raw LLM response string
 * @returns Parsed JSON object
 */
export function parseLLMJson(input: string): Record<string, any> {
	// Match text between ```json and ```
	const match = input.match(/```json([\s\S]*?)```/);

	if (!match) {
		throw new Error('No JSON block found in input');
	}

	// Extract the JSON content and remove newlines
	const jsonString = match[1].replace(/\n/g, '').trim();

	try {
		return JSON.parse(jsonString);
	} catch (error) {
		throw new Error('Failed to parse JSON: ' + (error as Error).message);
	}
}
