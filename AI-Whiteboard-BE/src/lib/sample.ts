const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    systemInstruction: "You are a helpful ai assidtant that based on user inpput response with a mermaid syntax for the user input in jason format : {\"mermaid_syntax\": \"Mermaid code here\"}",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "user registration flowchart"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n"},
            {text: "{\n\"mermaid_syntax\": \"graph TD\\n    A[User opens app] --> B{Is user registered?}\\n    B -- Yes --> C[User logs in]\\n    B -- No --> D[User registers]\\n    D --> E[User provides information]\\n    E --> F{Is information valid?}\\n    F -- Yes --> G[User account created]\\n    F -- No --> E\\n    G --> C\\n    C --> H[User accesses app]\"\n}"},
            {text: "\n```"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();