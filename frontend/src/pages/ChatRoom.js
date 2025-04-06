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
    <div className="chatroom-container">
      <div className="chatroom-box">
        <div className="header">🌾 Farmer-Vendor Chat</div>
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender === 'Vendor' ? 'vendor' : 'farmer'}`}>
              <div className="message-bubble">
                <p className="sender">{msg.sender}</p>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;

const styles = `
  /* Main container */
  .chatroom-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #d1fae5; /* Light green background */
  }

  /* Chatroom box */
  .chatroom-box {
    width: 100%;
    max-width: 700px;
    height: 600px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #c6f6d5; /* Light green border */
  }

  /* Header */
  .header {
    background-color: #38a169; /* Green */
    color: white;
    padding: 16px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
  }

  /* Messages container */
  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #f0fff4; /* Very light green */
  }

  /* Message bubble styles */
  .message {
    margin-bottom: 16px;
  }

  .message .message-bubble {
    max-width: 75%;
    padding: 12px;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .message .farmer .message-bubble {
    background-color: #e2e8f0; /* Light gray for farmer */
    color: #2d3748; /* Dark text for farmer */
    border-bottom-left-radius: 0;
  }

  .message .vendor .message-bubble {
    background-color: #38a169; /* Green for vendor */
    color: white;
    border-bottom-right-radius: 0;
    text-align: right;
  }

  /* Message input area */
  .message-input {
    display: flex;
    padding: 16px;
    border-top: 1px solid #c6f6d5; /* Light green border */
    background-color: white;
    align-items: center;
    justify-content: space-between;
  }

  .message-input input {
    width: 80%;
    padding: 12px;
    border-radius: 25px;
    border: 1px solid #ddd;
    font-size: 1rem;
  }

  .message-input button {
    padding: 12px 24px;
    background-color: #38a169;
    color: white;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
  }

  .message-input button:hover {
    background-color: #2f855a;
  }
`;

// Create a style element and append the styles to the head of the document
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
