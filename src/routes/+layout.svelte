<!--routes/+layout.svelte-->

<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head></svelte:head>

<div class="flex min-h-screen justify-center bg-gray-800">
	<!-- Main content area -->
	<main class="min-h-screen w-full bg-white shadow-md md:max-w-3xl md:border-x md:border-gray-800">
		{@render children?.()}
	</main>
</div>
