const { genAI, generateTextRequest } = require('.');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


let testContext = ``

let testRequest = ``

let testInput = ""

async function testByConsolePrompt() {
  readline.question('Context: ', (context) => {
    testContext = context
    readline.question('Request: ', (request) => {
      testRequest = request
      readline.question('Input: ', (input) => {
        testInput = input
        readline.close();
        run();

      });

    });

  });


}
async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = generateTextRequest(testContext, testRequest, testInput);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}



function simplePrompt() {
  let model = genAI.getGenerativeModel({ model: "gemini-pro" });
  readline.question("prompt: ", async (prompt) => {
    console.log("loading...")
    readline.close();
    let result = await model.generateContent(prompt);
    let response = result.response;
    let text = response.text();
    console.log(" response: \n", text)

  })
}

simplePrompt()
