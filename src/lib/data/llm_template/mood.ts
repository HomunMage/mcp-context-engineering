// lib/data/llm_template/mood.ts

export const moodPromptTemplate = `
here is today's diary:
\`\`\`
{{ user_chat }}
\`\`\`

reply me in structure output
the mood only have 4 possible, sad, angry, happy, soso
\`\`\`json
{
  "mood": "<today's mood>"
}
\`\`\`
`;
