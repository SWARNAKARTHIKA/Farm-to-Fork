import React, { useState } from 'react';

const ChatRoom = () => {
  const [messages, setMessages] = useState([
    { sender: 'Farmer', message: 'Hello, I need help with my harvest.' },
    { sender: 'Vendor', message: 'Sure, I can assist you. What seems to be the issue?' },
    // More messages
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Vendor', message: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-room">
      <h1>Chat Room</h1>
      <div className="message-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
            <p><strong>{msg.sender}:</strong> {msg.message}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input 
          type="text" 
          value={newMessage} 
          onChange={(e) => setNewMessage(e.target.value)} 
          placeholder="Type a message..." 
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
