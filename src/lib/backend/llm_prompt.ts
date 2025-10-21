// src/lib/backend/llm_prompt.ts
import { ChatWithGemini } from './llm';

/**
 * ChatLLM
 * Replaces the {{user_chat}} placeholder in the prompt template
 * and sends the completed prompt to the Gemini API.
 *
 * @param apiKey - Google API key for Gemini
 * @param prompt_template - The template string containing {{user_chat}}
 * @param user_chat - The user's chat message to insert into the template
 * @returns The model's response text
 */
export async function ChatLLM(
	apiKey: string,
	prompt_template: string,
	user_chat: string
): Promise<string> {
	// Replace all instances of {{user_chat}} with the user's input
	const filledPrompt = prompt_template.replace(/{{\s*user_chat\s*}}/g, user_chat);

	// Call the existing Gemini chat function
	const response = await ChatWithGemini(apiKey, filledPrompt);

	return response;
}
