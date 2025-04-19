import React, { createContext, useState, useEffect } from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [messages, setMessages] = useState(() => {
    const stored = localStorage.getItem('allMessages');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('allMessages', JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const getMessagesForUser = (username) => {
    return messages.filter(
      (msg) => msg.to === username || msg.from === username
    );
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage, getMessagesForUser }}>
      {children}
    </MessageContext.Provider>
  );
};