const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("YOUR_API_KEY_HERE");

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent("Hello");
    const response = await result.response;

    console.log("✅ API WORKING:");
    console.log(response.text());

  } catch (err) {
    console.log("❌ ERROR:");
    console.log(err.message);
  }
}

test();