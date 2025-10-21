// src/lib/data/llm_template/mcp.ts

export const mcpPromptTemplate = `
this is the {{ user_chat }}

reply me in structured output

you should strongly align with this format:

\`\`\`json
{{ user_template }}
\`\`\`
`;
