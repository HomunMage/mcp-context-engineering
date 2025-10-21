<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { apiKey } from '$lib/stores/status.cache';
  import { LLMtoMCP } from '$lib/backend/llm_prompt';
  import { mcpPromptTemplate } from '$lib/data/llm_template/mcp';
  import Button from '$lib/UI/Button.svelte';
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';

  let userInput = '';
  let templateInput = `{
  "jsonrpc": "2.0",
  "id": "call-1234",
  "method": "tools/call",
  "params": {
    "name": "your_tool_name",
    "arguments": {
      "paramA": "valueA",
      "paramB": 42,
      "paramC": true
    }
  }
}`;
  let response = '';
  let loading = false;
  let error = '';

  async function sendMessage() {
    if (!userInput.trim()) {
      error = 'Please enter a message.';
      return;
    }
    if (!$apiKey) {
      error = 'Please set your API key first.';
      return;
    }

    loading = true;
    error = '';
    response = '';

    try {
      // Call new LLMtoMCP function
      response = await LLMtoMCP($apiKey, mcpPromptTemplate, userInput, templateInput);
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unexpected error occurred.';
    } finally {
      loading = false;
    }
  }

  function goToKeyPage() {
    goto(resolve('/key'));
  }
</script>

<div class="relative">
  <div class="absolute right-4 top-4">
    <Button variant="secondary" onclick={goToKeyPage}>Set Key</Button>
  </div>

  <div class="container mx-auto max-w-3xl p-8">
    <h1 class="mb-8 text-3xl font-bold text-gray-900">🧩 LLM to MCP Chat</h1>

    <div class="space-y-8">
      <!-- Template Section -->
      <div class="flex flex-col gap-3">
        <label class="font-semibold text-gray-800">Structured Template (JSON or schema)</label>
        <textarea
          name="template"
          rows="10"
          placeholder="Enter your JSON or schema here..."
          bind:value={templateInput}
          class="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>
      </div>

      <!-- Input Section -->
      <div class="flex flex-col gap-3">
        <label class="font-semibold text-gray-800">Your Message</label>
        <textarea
          name="message"
          rows="6"
          placeholder="Type your instruction or question..."
          bind:value={userInput}
          class="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        ></textarea>

        <Button variant="primary" onclick={sendMessage} disabled={loading}>
          {loading ? 'Processing...' : 'Send'}
        </Button>
      </div>

      <!-- Error Message -->
      {#if error}
        <div class="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <p class="font-medium text-red-800">Error: {error}</p>
        </div>
      {/if}

      <!-- Response Display -->
      {#if response}
        <div class="rounded-lg border border-blue-200 bg-blue-50 p-6 whitespace-pre-wrap">
          <h2 class="text-lg font-semibold text-gray-900 mb-2">Response:</h2>
          <p class="text-gray-800">{response}</p>
        </div>
      {/if}

      <!-- Loading State -->
      {#if loading}
        <div class="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <p class="animate-pulse text-gray-600">Processing your message...</p>
        </div>
      {/if}
    </div>
  </div>
</div>
