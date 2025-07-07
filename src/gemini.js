import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";


const apiKey = "AIzaSyC7ONTfBRil_3aa6GP-wMtDu-OA8Y55P9s";

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", 
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 20, 
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chat = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
}

export default run;




    
    
