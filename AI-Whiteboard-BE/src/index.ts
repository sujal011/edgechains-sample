import { ArakooServer } from "@arakoodev/edgechains.js/arakooserver";
import Jsonnet from "@arakoodev/jsonnet";
import {createSyncRPC} from "@arakoodev/edgechains.js/sync-rpc";

import fileURLToPath from "file-uri-to-path";
import path from "path";
const server = new ArakooServer();

const app = server.createApp();

const jsonnet = new Jsonnet();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mermaidCall = createSyncRPC(path.join(__dirname, "./lib/mermaid.cjs"));

app.get("/generate-diagram", async (c: any) => {
  
    const prompt = c.req.query("prompt");
    const gemini_api = JSON.parse(
        jsonnet.evaluateFile(path.join(__dirname, "../jsonnet/secrets.jsonnet"))
    ).gemini_api;
    jsonnet.extString("prompt", prompt || "");
    jsonnet.extString("gemini_api", gemini_api);
    jsonnet.javascriptCallback("mermaidCall", mermaidCall);
    // jsonnet.javascriptCallback("getPageContent", getPageContent);
    let response = jsonnet.evaluateFile(path.join(__dirname, "../jsonnet/main.jsonnet"));
    return c.json(response);
});

app.get("/",async(c:any)=>{
    return c.json({"hello":"hello"});
})

server.listen(3000);