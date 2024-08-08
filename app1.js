const fs = require('fs');
const pdf = require('pdf-parse');
const OpenAI = require('openai');
const { GoogleGenerativeAI } =require("@google/generative-ai");
require('dotenv').config()


const giveDetails=async(text)=>{
    // console.time('gemnai')
    const genAI = new GoogleGenerativeAI(process.env.GEMNAI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
    You are an expert in extracting information from invoices.
    Here is the invoice text:
    
    ${text}
    
    Please extract the following details:
    - Customer Details
    - Products
    - Total Amount
    - just give specified data text format and json format
    
    `;;
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    //   console.timeEnd('gemnai')

}
//Error extracting details from text: 429 You exceeded your current quota, please check your plan and billing details.
// const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
// async function extractDetailsFromText(text) {
//     try {
//         const completion = await openai.chat.completions.create({
//             model: '', // Use the appropriate model
//             messages: [
//                 { role: 'system', content: 'You are a helpful assistant.' },
//                 { role: 'user', content: `Extract the following details from the text:\n1. Customer details\n2. Products\n3. Total Amount\n\nText:\n${text}` }
//             ],
//             temperature: 0.2,
//         });
//         console.log(completion.choices[0]);

//         return completion.choices[0].trim();
//     } catch (error) {
//         console.error('Error extracting details from text:', error.message);
//         throw error;
//     }
// }

let dataBuffer = fs.readFileSync('test.pdf');
pdf(dataBuffer).then(function (data) {
    const promptText = data.text;
    console.log("prompt:", promptText)
    giveDetails(promptText)
    // const res = extractDetailsFromText(prompt)
    // console.log(res)
});



