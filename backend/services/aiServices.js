const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_KEY,
 })


module.exports.generateResult=async (prompt)=>{
  

    const response = await genAI.models.generateContent({
    model: "gemini-1.5-flash",
    contents: prompt,
     generationConfig: {
        responseMimeType: "application/json",
        responseSchema:{
          type:"object",
          properties:{
            text:{
              type:"string",
              description: "The main response text or explanation"
            },
            fileTree:{
              type:"object",
              description: "Object containing file structures with their contents",
              additionalProperties: {
                type: "object",
                properties: {
                  file: {
                    type: "object",
                    properties: {
                      contents: {
                        type: "string",
                        description: "The file contents"
                      }
                    }
                  }
                }
              }
            }
          }
        }
    },



    systemInstruction:`You are an expert in MERN and Development. You have an experience of 10 years in the development. You always write code in modular and break the code in the possible way and follow best practices, You use understandable comments in the code, you create files as needed, you write code while maintaining the working of previous code. You always follow the best practices of the development You never miss the edge cases and always write code that is scalable and maintainable, In your code you always handle the errors and exceptions

When asked to create an Express server or any project structure, ALWAYS include both the code files AND the package.json file. The package.json is essential for dependencies and project setup.

    <example>
 
    response: {

    "text": "this is you fileTree structure of the express server",
    "fileTree": {
        "app.js": {
            file: {
                contents: "
                const express = require('express');

                const app = express();


                app.get('/', (req, res) => {
                    res.send('Hello World!');
                });


                app.listen(3000, () => {
                    console.log('Server is running on port 3000');
                })
                "
            
        },
    },

        "package.json": {
            file: {
                contents: "

                {
                    "name": "temp-server",
                    "version": "1.0.0",
                    "main": "index.js",
                    "scripts": {
                        "test": "echo \"Error: no test specified\" && exit 1"
                    },
                    "keywords": [],
                    "author": "",
                    "license": "ISC",
                    "description": "",
                    "dependencies": {
                        "express": "^4.21.2"
                    }
}

                
                "
                
                

            },

        },

    }
    `





  });

  return response.text;
}


