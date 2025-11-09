interface ChatInterfaceProps {
  message: string;
  messages: string[];
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onDisconnect: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  message,
  messages,
  onMessageChange,
  onSendMessage,
  onDisconnect
}) => (
  <div>
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        placeholder="Type your message here..."
        onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
        style={{ width: '70%', padding: '10px', marginRight: '10px' }}
      />
      <button onClick={onSendMessage} disabled={!message.trim()}>
        Send Message
      </button>
    </div>

    <div style={{ marginTop: '20px' }}>
      <h3>Chat Messages:</h3>
      <div style={{ border: '1px solid #ddd', padding: '10px', height: '200px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>

    <button onClick={onDisconnect} style={{ marginTop: '20px' }}>
      Disconnect
    </button>
  </div>
);

export default ChatInterface;