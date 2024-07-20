/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
const dotenv = require('dotenv')

dotenv.config()

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.API_KEY;
console.log("API Key:", apiKey);
const genAI = new GoogleGenerativeAI(apiKey);
const safetySetting =
{
  category: HarmCategory.HARM_CATEGORY_HARASSMENT,
  threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
}

const model = genAI.getGenerativeModel({
  model: "tunedModels/juandvittest-gdvduptlrng1",
}, safetySetting);

const generationConfig = {
  temperature: 0.5,
  topP: 1,
  topK: 0,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  try {
    const parts = [
      { text: "input: Palabra: Pan" },
      { text: "output: " },
    ];


    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,

      // safetySettings: Adjust safety settings
      // See https://ai.google.dev/gemini-api/docs/safety-settings
    });
    console.log(result.response.text());
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

run();

//feature in development