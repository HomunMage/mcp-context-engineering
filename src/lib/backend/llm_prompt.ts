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

/**
 * LLMtoMCP
 * Advanced function that replaces both {{user_chat}} and {{user_template}} placeholders
 * and sends the combined structured prompt to Gemini.
 *
 * @param apiKey - Google API key for Gemini
 * @param prompt_template - Template containing placeholders
 * @param user_chat - User’s natural language input
 * @param user_template - User’s structured JSON or schema
 */
export async function LLMtoMCP(
  apiKey: string,
  prompt_template: string,
  user_chat: string,
  user_template: string
): Promise<string> {
  let filledPrompt = prompt_template;

  // Replace both placeholders safely
  filledPrompt = filledPrompt
    .replace(/{{\s*user_chat\s*}}/g, user_chat)
    .replace(/{{\s*user_template\s*}}/g, user_template);

  const response = await ChatWithGemini(apiKey, filledPrompt);
  return response;
}
