import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.words),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(words) {
  return `Suggest two places to go on vacation based on two words.

Words: Surf Island
Places: Hawaii, Tavarua
Words: Mountain Buda
Places: Tibet Nepal
Words: ${words}
Places:`;
}