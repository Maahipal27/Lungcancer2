import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { useState } from "react";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyAIgGh9IIpk9h4EEzTEVGV0gc-Y_u_5gYQ";

export default function Gemini() {
  const [data, setData] = useState("");

  async function runChat(message) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "HELLO" }],
        },
        {
          role: "model",
          parts: [{ text: "Hello there! How can I assist you today?" }],
        },
      ],
    });
    //////////Validation
    const validationString =
      "$ Please tell if the message before dollar symbol is related to lung cancer or health. If it is related to health or cancer give 1 as a reply else 0.";
    const reply = await chat.sendMessage(message + validationString);
    console.log(reply.response.text());
    if (reply.response.text() === "0") {
      setData("Please ask questions related to health");
      return;
    }

    const prompt = "Act as a doctor. ";
    const result = await chat.sendMessage(prompt + message);
    const response = result.response;
    setData(response.text());
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const message = event.target?.prompt?.value || "";
    runChat(message);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <form onSubmit={onSubmit} className="">
        <p className="mb-2">Enter your prompt here</p>
        <input
          type="text"
          placeholder="Enter your prompt here"
          name="prompt"
          className="border-none outline-none p-4 rounded-lg text-black"
        />{" "}
        <br />
        <button
          type="submit"
          className="bg-white border border-none outline-none p-4 rounded-lg text-black font-bold uppercase mt-2"
        >
          Submit
        </button>
      </form>
      {data && (
        <div>
          <h1 className="mt-32">Output</h1>
          <div dangerouslySetInnerHTML={{ __html: data }} />
        </div>
      )}
    </main>
  );
}
