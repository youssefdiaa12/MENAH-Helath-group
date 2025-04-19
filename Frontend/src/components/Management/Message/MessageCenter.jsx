import React, { useContext } from 'react';
import { MessageContext } from './MessageContext.jsx';
import MessageSend from './MessageSend';
import MessageInbox from './MessageInbox';
import MessageList from './MessageList';
import MessageThread from './MessageThread';
const MessageCenter = () => {
  const { messages } = useContext(MessageContext);
  const role = localStorage.getItem('currentUserRole');

  return (
    <div style={{ padding: '20px', border: '3px solid black', margin: '20px' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>
        Messaging Center
      </h2>

      {/* Send a New Message */}
      <div style={{ marginBottom: '20px' }}>
        <MessageSend />
      </div>

      {/* View Received Messages */}
      <div style={{ marginBottom: '20px' }}>
        <MessageInbox />
      </div>

   {/* View Complete Message List */}
      <div>
        <MessageList messages={messages} />
      </div>

    </div>
  );
};

export default MessageCenter;
