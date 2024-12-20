local promptTemplate = |||
                        You are an AI assistant that generates diagrams in Mermaid syntax.
                        Always respond in the following JSON format:
                        {"mermaid_syntax": "Mermaid code here"}
                        
                        For example, if asked to draw a flowchart, your response might be:
                        {"mermaid_syntax": "graph TD\\nA[Start] --> B[Login]\\nB -->|Success| C[Dashboard]\\nB -->|Fail| D[Error]"}
                        
                        Do not include any additional explanations or outputs.
                        
                        user input: {content}
                        
                       |||;


local prompt = std.extVar("prompt");
// local task = "go to" + pageUrl + "and scrap the hole page text";
local gemini_api = std.extVar('gemini_api');
local getFullPrompt(content) = 
    local promptWithContent = std.strReplace(promptTemplate,'{content}', content + "\n");
    promptWithContent;

local main(prompt) =
local response = arakoo.native("mermaidCall")({ prompt: prompt, geminiKey: gemini_api });
    response;

main(getFullPrompt(prompt))