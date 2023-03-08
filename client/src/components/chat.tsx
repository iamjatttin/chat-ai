import React from "react";

const Chat = () => {
  return (
    <div className="bg-cyan-100 h-screen flex justify-center">
      <div className="bg-cyan-200 w-1/3 h-98 my-4 rounded-xl flex flex-col">
        <div className="bg-cyan-500 h-12 rounded-t-xl"></div>
        <div className="w-full h-12 rounded-xl flex items-center">
          <div className="bg-cyan-500 max-w-[75%] mx-2 rounded-xl my-auto flex items-center">
            <p className="px-2 py-1 pb-2">hello</p>
          </div>
        </div>
        <div className="w-full h-12 rounded-xl flex items-center">
          <div className="bg-cyan-500 max-w-[75%] mx-2 rounded-xl my-auto flex items-center">
            <p className="px-2 py-1 pb-2">hello</p>
          </div>
        </div>
        <div className="w-full h-12 rounded-xl flex items-center">
          <div className="bg-cyan-500 max-w-[75%] mx-2 rounded-xl my-auto flex items-center">
            <p className="px-2 py-1 pb-2">hello</p>
          </div>
        </div>
        <div className="flex-grow"></div>
        <div className="w-full flex justify-center items-center my-1">
          <input type="text" className="border h-full w-full ml-1 bg-cyan-50 rounded-xl px-2" />
          <button type="button" className="primary-btn rounded-xl mx-1 bg-gray-100 px-5 py-1 pb-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
