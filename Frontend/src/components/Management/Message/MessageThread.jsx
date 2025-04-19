import React from 'react';

const MessageThread = ({ threadId }) => {
  // Thread ID is optional and safely handled
  return (
    <div style={{ padding: '20px', border: '1px solid gray' }}>
     <h3>Message Thread {threadId ? `- ID: ${threadId}` : ''}</h3>

      {/* Static thread content */}
      <ul>
        <li><strong>Message 1:</strong> Hello, this is a sample message.</li>
        <li><strong>Message 2:</strong> Another example message.</li>
      </ul>

      <p><strong>Total Messages:</strong> 2</p>

      <textarea
        placeholder="Type a reply here..."
        style={{ width: '100%', height: '80px', marginTop: '10px', padding: '10px' }}
      />
      <button
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
        onClick={() => alert('Reply sent!')}
      >
        Send Reply
      </button>

      <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#777' }}>
        This is a placeholder for future threaded messaging logic.
      </p>
    </div>
  );
};

export default MessageThread;