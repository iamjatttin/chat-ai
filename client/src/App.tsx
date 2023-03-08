import React, { useState, useEffect } from "react";
import "./App.css";

interface Message {
  clientId: number;
  message: string;
  clientmsg: string;
}

function App(): JSX.Element {
  const [clientId, setClientId] = useState<number>(Math.floor(new Date().getTime() / 1000));

  const [messages, setMessages] = useState<Message[]>([]);
  const [textValue, setTextValue] = useState<string>("");
  const [msgTab, setmsgTab] = useState<string[]>([]);
  const [websocket, setWebsocket] = useState<WebSocket>();

  useEffect(() => {
    const url = `ws://localhost:8000/ws/${clientId}`;
    const ws = new WebSocket(url);
    ws.onopen = () => {
      ws.send("Connect");
    };
    ws.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };
    setWebsocket(ws);
    return () => ws.close();
  }, [clientId]);

  const sendMessage = () => {
    if (!websocket) return;
    setmsgTab([...msgTab, textValue]);
    websocket.send(textValue);
    setTextValue("");
  };

  return (
    <div className="bg-cyan-100 h-screen flex justify-center">
      <div className="bg-cyan-200 w-1/3 h-98 overflow-y-scroll my-4 rounded-xl flex flex-col">
        <div className="flex justify-center text-center items-center py-2 bg-cyan-500 h-12 rounded-t-xl">
          <h2>Your client id: {clientId} </h2>
        </div>
        <div className="h-98 overflow-y-scroll ">
          {messages.map((message, index) => {
            const isMyMessage = message.clientId === clientId;
            return (
              <div key={index} className="w-full h-30 rounded-xl flex flex-col">
                {message.clientmsg != "" && (
                  <div className="w-full flex items-center">
                    <div className="w-9 h-9 mx-2 rounded-full bg-white flex justify-center items-center">
                      <img src="/user.png" alt="" className="w-6 h-6 rounded-full" />
                    </div>
                    <div className="bg-cyan-300 max-w-[75%] w-fit mx-2 rounded-xl my-1 flex items-center">
                      <p className="px-2 py-1 pb-2">{message.clientmsg}</p>
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
