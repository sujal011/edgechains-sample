const { Gemini } = require("@arakoodev/edgechains.js/gemini");
import { z } from "zod";

const schema = z.object({
    answer: z.string().describe("The answer to the question"),
});

async function geminiCall({ prompt, geminiKey }: any) {
    try {
        const gemini = new Gemini({ apiKey: geminiKey });
        let res = await gemini.zodSchemaResponse({ prompt, schema: schema });
        return JSON.stringify(res);
    } catch (error) {
        return error;
    }
}

module.exports = geminiCall;