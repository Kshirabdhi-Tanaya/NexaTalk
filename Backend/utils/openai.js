import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getOpenAIAPIResponse = async (message) => {
  const response = await client.responses.create({
    model: "gpt-4o-mini",
    input: message,
  });

  return response.output[0].content[0].text;
};

export default getOpenAIAPIResponse;
