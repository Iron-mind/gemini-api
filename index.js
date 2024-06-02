const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv')

dotenv.config()
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);




function generateTextRequest(context, request, input) {

  const template = `Con base al contexto
                    contexto:
                    ${context}

                    contesta las siguiente petición:
                    ${request}
                    para esta entrada:
                    ${input}

`
  return template
}




module.exports = {
  generateTextRequest,
  genAI
}