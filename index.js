const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv')

dotenv.config()
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// text in an especial string js
let activities = `Revoque en cielo raso.
Instalación de cableado para puntos eléctricos y de iluminación.
Revoque en paredes.
Instalación de esquineros.
Instalación de dilataciones plásticas en paredes y cielo raso.
Instalación de monomando.
Impermeabilización en zona de ducha.
Revoque en baño principal.
Revoque en baño social.
Revoque en zona de ropas.
Nicho en Superboard en baño de media altura.
Nicho en Superboard en baño de doble altura.
Enchape de paredes de baño principal con cerámica / porcelanato / SPC formato 120x60.
Enchape de paredes de baño social con cerámica / porcelanato / SPC formato 120x60.
Estructura de cielo descolgado en baños, cocina y oficios.
Tapa de yeso para cielo descolgado en baños, cocina y oficios.`


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


let testContext = `Para remodelar una casa hay que tener cuidado en el orden de las actividades, por ejemplo no puedes  hacer el enchape despues despues de la Impermeabilización`

let testRequest = `¿Cuál es el orden de las actividades para remodelar una casa? de me el orden en el siguiente formato json:
                    [{"name":<nombre de la actividad>,"order":<orden de la actividad>}, ...]`

let testInput = activities


async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = generateTextRequest(testContext, testRequest, testInput);

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();