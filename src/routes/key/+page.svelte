<script lang="ts">
	import { apiKey } from '$lib/stores/status.cache';
	import Input from '$lib/UI/Input.svelte';
	import Label from '$lib/UI/Label.svelte';
	import Button from '$lib/UI/Button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	let inputValue = '';

	function setKey() {
		apiKey.set(inputValue);
		inputValue = '';
	}

	function clearKey() {
		apiKey.set('');
		inputValue = '';
	}

	function goHome() {
		goto(resolve(`/`));
	}
</script>

<div class="container mx-auto max-w-2xl p-8">
	<h1 class="mb-8 text-3xl font-bold text-gray-900">🔐 API Key Manager</h1>

	<div class="space-y-6">
		<!-- Current Cached Key Display -->
		<div class="rounded-lg bg-gray-50 p-4">
			<h2 class="mb-2 text-sm font-semibold tracking-wide text-gray-600 uppercase">
				Current Cached Key
			</h2>
			<p class="font-mono text-lg text-gray-900">
				{$apiKey || '(none)'}
			</p>
		</div>

		<!-- Input Section -->
		<Label text="Enter API Key">
			<Input
				name="apikey"
				type="text"
				placeholder="Type your API key here..."
				bind:value={inputValue}
			/>
		</Label>

		<!-- Action Buttons -->
		<div class="flex gap-3">
			<Button variant="primary" onclick={setKey}>Set Key</Button>
			<Button variant="danger" onclick={clearKey}>Clear Key</Button>
			<Button variant="secondary" onclick={goHome}>Go Home</Button>
		</div>
	</div>
</div>
