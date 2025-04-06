import React, { useState } from 'react';

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { sender: 'Farmer', message: 'Hello, I need help with my harvest.' },
    { sender: 'Vendor', message: 'Sure, I can assist you. What seems to be the issue?' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Vendor', message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden border border-green-200">
        <div className="bg-green-600 text-white px-6 py-4 text-xl font-semibold">
          🌾 Farmer-Vendor Chat
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-green-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === 'Vendor' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                  msg.sender === 'Vendor'
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm font-semibold mb-1">{msg.sender}</p>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white flex gap-2 border-t border-green-100">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-semibold transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
