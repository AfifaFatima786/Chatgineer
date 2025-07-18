const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_KEY,
 })


module.exports.generateResult=async (prompt)=>{
  

    const response = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
  });

  return response.text;
}


