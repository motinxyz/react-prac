// import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from "@huggingface/inference";

const HF_API_KEY = import.meta.env.VITE_API_KEY_HF;
const GEMINI_API_KEY = import.meta.env.VITE_API_KEY_GEMINI;
const MODEL_NAME = "gemini-2.0-flash";
// const MODEL_NAME = "gemini-1.5-pro";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = ` 
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`;

// const anthropic = new Anthropic({
//     // Make sure you set an environment variable in Scrimba
//     // for ANTHROPIC_API_KEY
//     apiKey: process.env.ANTHROPIC_API_KEY,

//     dangerouslyAllowBrowser: true,
// })

// export async function getRecipeFromChefClaude(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")

//     const msg = await anthropic.messages.create({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1024,
//         system: SYSTEM_PROMPT,
//         messages: [
//             { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//         ],
//     });
//     return msg.content[0].text
// }

// const hf = new HfInference(process.env.REACT_APP_API_KEY_HF);
const hf = new HfInference(HF_API_KEY);

export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  try {
    const response = await hf.chatCompletion({
      model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        },
      ],
      max_tokens: 1024,
    });
    return response.choices[0].message.content;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getRecipeFromGemini(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const requestData = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make! write the response in bengla language.`,
            },
          ],
        },
      ],
    };
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    });

    // const data = await response.json();
    // return data.candidates[0]?.content || "No response received.";
    const data = await response.json();
    const recipeText =
      data.candidates[0]?.content?.parts[0]?.text || "No response received.";
    return recipeText;
  } catch (err) {
    console.error("Error:", err.message);
    return "Failed to get recipe.";
  }
}
