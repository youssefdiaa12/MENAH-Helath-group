import React, { useContext } from 'react';
import { MessageContext } from './MessageContext';

const MessageInbox = () => {
  const { messages } = useContext(MessageContext);
  const currentUser = localStorage.getItem('currentUsername') || 'Unknown';

  const inboxMessages = messages.filter((msg) => msg.to === currentUser);

  return (
    <div style={{ border: '2px solid gray', padding: '10px', marginTop: '20px' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Inbox</h3>
      {inboxMessages.length === 0 ? (
        <p>No messages received.</p>
      ) : (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {inboxMessages.map((msg, index) => (
            <li key={index} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
              <p><strong>From:</strong> {msg.from}</p>
              <p><strong>Message:</strong> {msg.text}</p>
              <p><em>{msg.date}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageInbox;