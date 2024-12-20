const { GeminiAI } = require("@arakoodev/edgechains.js/ai");


async function mermaidCall({ prompt, geminiKey }: any) {
    try {
        const gemini = new GeminiAI({ apiKey: geminiKey });
        let res = await gemini.chat({
            model:"gemini-2.0-flash-exp",
            responseType:"application/json",
            prompt:prompt
        });
        return JSON.stringify(res);
    } catch (error) {
        return error;
    }
}

module.exports = mermaidCall;