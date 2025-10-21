<!-- src/routes/chat/+page.svelte -->
<script lang="ts">
	import { apiKey } from '$lib/stores/status.cache';
	import { ChatWithGemini } from '$lib/backend/llm';
	import Button from '$lib/UI/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let userInput = '';
	let response = '';
	let loading = false;
	let error = '';

	async function sendMessage() {
		if (!userInput.trim()) return;
		if (!$apiKey) {
			error = 'Please set your API key first';
			return;
		}

		loading = true;
		error = '';
		response = '';

		try {
			response = await ChatWithGemini($apiKey, userInput);
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred';
		} finally {
			loading = false;
		}
	}

	function goToKeyPage() {
		goto(resolve('/key'));
	}
</script>

<div class="container mx-auto max-w-3xl p-8">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">💬 Chat with Gemini</h1>

	<div class="space-y-6">
		<!-- Input Section -->
		<div class="flex flex-col gap-3">
			<textarea
				name="message"
				rows="6"
				placeholder="Type your message..."
				bind:value={userInput}
				class="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
			></textarea>

			<Button variant="primary" onclick={sendMessage} disabled={loading}>
				{loading ? 'Sending...' : 'Send'}
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
		{#if response}
			<div class="rounded-lg border border-blue-200 bg-blue-50 p-6">
				<h2 class="mb-3 text-sm font-semibold tracking-wide text-blue-800 uppercase">
					Google's Reply
				</h2>
				<p class="whitespace-pre-wrap text-gray-900">{response}</p>
			</div>
		{/if}

		<!-- Loading State -->
		{#if loading}
			<div class="rounded-lg border border-gray-200 bg-gray-50 p-6">
				<p class="animate-pulse text-gray-600">Waiting for response...</p>
			</div>
		{/if}
	</div>
</div>
