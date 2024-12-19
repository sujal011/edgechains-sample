const { GeminiAI } = require("@arakoodev/edgechains.js");
import { z } from "zod";

const schema = z.object({
    mermaid_syntax: z.string().describe("The mermaid syntax for the follwing prompt"),
});

async function mermaidCall({ prompt, geminiKey }: any) {
    try {
        const gemini = new GeminiAI({ apiKey: geminiKey });
        let res = await gemini.zodSchemaResponse({ prompt, schema: schema });
        return JSON.stringify(res);
    } catch (error) {
        return error;
    }
}

module.exports = mermaidCall;