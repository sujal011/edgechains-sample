const { GoogleGenerativeAI } = require("@google/generative-ai");


async function askAI({ prompt, geminiKey }: any) {
    try {
        const gemini = new GoogleGenerativeAI(geminiKey);
        const model = gemini.getGenerativeModel({
            model: "gemini-2.0-flash-exp",
            systemInstruction: "You have been given an image with some mathematical expressions, equations, or graphical problems, and you need to solve them. Note: Use the PEMDAS rule for solving mathematical expressions. PEMDAS stands for the Priority Order: Parentheses, Exponents, Multiplication and Division (from left to right), Addition and Subtraction (from left to right). Parentheses have the highest priority, followed by Exponents, then Multiplication and Division, and lastly Addition and Subtraction.\n\nFor example:\nQ. 2 + 3 * 4\n(3 * 4) => 12, 2 + 12 = 14.\nQ. 2 + 3 + 5 * 4 - 8 / 2\n5 * 4 => 20, 8 / 2 => 4, 2 + 3 => 5, 5 + 20 => 25, 25 - 4 => 21.\n\nYou can have five types of equations/expressions in this image, and only one case shall apply every time:\n\nFollowing are the cases:\n1. Simple mathematical expressions like 2 + 2, 3 * 4, 5 / 6, 7 - 8, etc.: In this case, solve and return the answer in the format of one dictionary {'expr': given expression, 'result': calculated answer}.\n2. Set of equations like x^2 + 2x + 1 = 0, 3y + 4x = 0, 5x^2 + 6y + 7 = 12, etc.: In this case, solve for the given variable, and the format should be a comma-separated list of dictionaries, with dict 1 as {'expr': 'x', 'result': 2, 'assign': True} and dict 2 as {'expr': 'y', 'result': 5, 'assign': True}. This example assumes x was calculated as 2, and y as 5. Include as many dictionaries as there are variables.\n3. Assigning values to variables like x = 4, y = 5, z = 6, etc.: In this case, assign values to variables and return another key in the dictionary called {'assign': True}, keeping the variable as 'expr' and the value as 'result' in the original dictionary. Return as a list of dictionaries.\n4. Analyzing graphical math problems, which are word problems represented in drawing form, such as cars colliding, trigonometric problems, problems on the Pythagorean theorem, adding runs from a cricket wagon wheel, etc. These will have a drawing representing some scenario and accompanying information with the image. Pay close attention to different colors for these problems. You need to return the answer in the format of a one dictionary {'expr': given expression, 'result': calculated answer}.\n5. Detecting abstract concepts that a drawing might show, such as love, hate, jealousy, patriotism, or a historic reference to war, invention, discovery, quote, etc. Use the same format as others to return the answer, where 'expr' will be the explanation of the drawing, and 'result' will be the abstract concept.\n\nAnalyze the equation or expression in this image and return the answer according to the given rules:\nMake sure to use extra backslashes for escape characters like \\f -> \\\\f, \\n -> \\\\n, etc.\nHere is a dictionary of user-assigned variables. If the given expression has any of these variables, use its actual value from this dictionary accordingly: {}.\nDo not use backticks or markdown formatting.\nProperly quote the keys and values in the dictionary for easier parsing with Python's `ast.literal_eval`.",
          });
          const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
          };
          const chatSession = model.startChat({
            generationConfig,
            history: [
            ],
          });
        
          const result = await chatSession.sendMessage(prompt);
          const response = JSON.parse(result.response.text());
          // console.log(response);
          
          return response;
    } catch (error) {
        return error;
    }
}

module.exports = askAI;

