const { readFileSync } = require("fs");

// Access your API key as an environment variable.
const { genAI } = require(".");

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  let imgBuff = Buffer.from(readFileSync(path))//.toString("base64")
  console.log(typeof imgBuff)
  return {
    inlineData: {
      data: imgBuff.toString("base64"),
      mimeType
    },
  };
}
const generationConfig = {
  temperature: 0.5,
  topP: 0.7,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig });
async function generateContentFromImage(prompt, imgPath, mimeType) {
  // Choose a model that's appropriate for your use case.



  const imageParts = [
    fileToGenerativePart(imgPath, mimeType),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = result.response;
  let text = response.text();
  console.log(text)

  return text
}

const prompt = "Who is the main character in the image?";

generateContentFromImage(prompt, "img_examples/mark.jpg", "image/jpeg");