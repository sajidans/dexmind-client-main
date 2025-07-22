import { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const ChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  // Scroll to the bottom of the chat when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handler for sending message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter a message',
        toast: true,
        position: 'top-end',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setIsLoading(true);

    // Add message to chat history
    const updatedMessages = [
      ...messages,
      { from: 'user', text: newMessage, timestamp: new Date().toISOString() },
    ];
    setMessages(updatedMessages);

    // Reset input
    setNewMessage('');
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="w-full h-fit border-2 border-[#00d5e6] rounded-3xl p-5 bg-[#101727]">
        <h1 className="text-[1.5rem] mb-5 text-white">Support Chat</h1>
        <div
          className="max-h-[300px] overflow-y-auto mb-5 space-y-4 text-white text-[1rem] bg-[#0e1624] p-4 rounded-lg"
          ref={chatContainerRef}
        >
          {messages.length === 0 ? (
            <p className="text-gray-400 text-center">No messages yet. Start the conversation!</p>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="flex justify-end">
                <div className="p-3 text-2xl rounded-lg max-w-[70%] bg-blue-600">
                  <p>{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{formatTimestamp(msg.timestamp)}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat input form */}
        <div className="flex items-center gap-4">
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            type="text"
            placeholder="Type your message..."
            className="flex-1 border-2 border-white rounded-lg py-2 px-4 bg-[#101727] text-[1.5rem] placeholder:text-white text-white"
            disabled={isLoading}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
          />
          <button
            className={`px-4 py-2 bg-blue-600 text-2xl text-white rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

ChatUI.propTypes = {};

export default ChatUI;