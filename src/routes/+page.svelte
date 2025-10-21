<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { apiKey } from '$lib/stores/status.cache';
	import { ChatLLM } from '$lib/backend/llm_prompt';
	import { moodPromptTemplate } from '$lib/data/llm_template/mood';
	import { parseLLMJson } from '$lib/utils/llm/parser';
	import Button from '$lib/UI/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let userInput = '';
	let response = '';
	let loading = false;
	let error = '';
	let mood: string | null = null;

	async function sendMessage() {
		if (!userInput.trim()) return;
		if (!$apiKey) {
			error = 'Please set your API key first';
			return;
		}

		loading = true;
		error = '';
		response = '';
		mood = null;

		try {
			response = await ChatLLM($apiKey, moodPromptTemplate, userInput);
			const parsed = parseLLMJson(response);
			mood = parsed.mood?.toLowerCase?.() ?? null;
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	function goToKeyPage() {
		goto(resolve('/key'));
	}

	function getMoodEmoji(m: string) {
		switch (m) {
			case 'happy':
				return '😄';
			case 'sad':
				return '😢';
			case 'angry':
				return '😠';
			case 'soso':
				return '😐';
			default:
				return '❓';
		}
	}
</script>

<div class="container mx-auto max-w-3xl p-8">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">🧠 Mood Analyzer</h1>

	<div class="space-y-6">
		<!-- Input Section -->
		<div class="flex flex-col gap-3">
			<textarea
				name="message"
				rows="6"
				placeholder="Write your diary for today..."
				bind:value={userInput}
				class="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			></textarea>

			<Button variant="primary" onclick={sendMessage} disabled={loading}>
				{loading ? 'Analyzing...' : 'Analyze Mood'}
			</Button>
		</div>

		<!-- Error Message -->
		{#if error}
			<div class="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4">
				<p class="font-medium text-red-800">Error: {error}</p>

				{#if error === 'Please set your API key first'}
					<Button variant="secondary" onclick={goToKeyPage}>Set Key</Button>
				{/if}
			</div>
		{/if}

		<!-- Response Section -->
		<!--
		{#if response}
			<div class="rounded-lg border border-blue-200 bg-blue-50 p-6">
				<h2 class="mb-3 text-sm font-semibold tracking-wide text-blue-800 uppercase">
					Raw Gemini Reply
				</h2>
				<p class="whitespace-pre-wrap text-gray-900">{response}</p>
			</div>
		{/if}
		-->

		<!-- Mood Display -->
		{#if mood}
			<div class="flex items-center gap-4 rounded-lg border border-green-200 bg-green-50 p-6">
				<span class="text-5xl">{getMoodEmoji(mood)}</span>
				<div>
					<h2 class="text-lg font-semibold text-gray-900 capitalize">Mood: {mood}</h2>
				</div>
			</div>
		{/if}

		<!-- Loading State -->
		{#if loading}
			<div class="rounded-lg border border-gray-200 bg-gray-50 p-6">
				<p class="animate-pulse text-gray-600">Analyzing your mood...</p>
			</div>
		{/if}
	</div>
</div>
