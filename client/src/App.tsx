import React, { useState } from "react";
import "./App.css";

interface Message {
  sender: string;
  message: string;
}

function App(): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([]);
  const [textValue, setTextValue] = useState<string>("");

  const sendMessage = async () => {
    if (textValue.trim() === "") return;
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `The following is a conversation between a user and an AI. The user says "${textValue}" and the AI responds.` }],

        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.log("Error: ChatGPT API call failed.");
      return;
    }

    const data = await response.json();
    const aiResponse = data.choices[0].text.trim();

    setMessages((prevMessages) => [...prevMessages, { sender: "user", message: textValue }]);
    setMessages((prevMessages) => [...prevMessages, { sender: "ai", message: aiResponse }]);

    setTextValue("");
  };
  return (
    <div className="bg-cyan-100 h-screen flex justify-center">
      <div className="bg-cyan-200 w-1/3 h-98 overflow-y-scroll my-4 rounded-xl flex flex-col">
        <div className="flex justify-center text-center items-center py-2 bg-cyan-500 h-12 rounded-t-xl">
          <h2>Chat with AI</h2>
        </div>
        <div className="h-98 overflow-y-scroll ">
          {messages.map((message, index) => {
            const isMyMessage = message.sender === "user";
            return (
              <div key={index} className="w-full h-30 rounded-xl flex flex-col">
                {message.message != "" && (
                  <div className="w-full flex items-center">
                    <div className="w-9 h-9 mx-2 rounded-full bg-white flex justify-center items-center">
                      <img src="/user.png" alt="" className="w-6 h-6 rounded-full" />
                    </div>
                    <div className="bg-cyan-300 max-w-[75%] w-fit mx-2 rounded-xl my-1 flex items-center">
                      <p className="px-2 py-1 pb-2">{message.message}</p>
                    </div>
                  </div>
                )}
                {message.message != "Connected" && (
                  <div className="w-full flex items-center">
                    <div className="w-9 h-9 mx-2 rounded-full bg-white flex justify-center items-center">
                      <img src="/bot.png" alt="" className="w-6 h-6 rounded-full" />
                    </div>
                    <div className="bg-cyan-600 max-w-[75%] w-fit mx-2 rounded-xl my-1 flex items-center">
                      <p className="px-2 py-1 pb-2">{message.message}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex-grow"></div>
        <div className="w-full flex justify-center items-center my-1">
          <input type="text" onChange={(e) => setTextValue(e.target.value)} value={textValue} className="border h-full w-full ml-1 bg-cyan-50 rounded-xl px-2" />
          <button type="button" onClick={sendMessage} className="primary-btn rounded-xl mx-1 bg-gray-100 px-5 py-1 pb-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
//key 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
