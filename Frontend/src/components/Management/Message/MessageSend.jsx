import React, { useContext, useState } from 'react';
import { MessageContext } from './MessageContext';
import { AuthContext } from '../../../context/AuthContext';
import { getEBMHealthTips } from './MessageUtils';

const MessageSend = () => {
  const { sendMessage } = useContext(MessageContext);
  const { currentUser } = useContext(AuthContext);
  const [to, setTo] = useState('');
  const [text, setText] = useState('');
  const [includeTip, setIncludeTip] = useState(false);
  const [selectedTip, setSelectedTip] = useState('');
  const isNurse = currentUser?.role === 'nurse';
  const isParent = currentUser?.role === 'parent';
  const language = currentUser?.language || 'en';

  const healthTips = getEBMHealthTips(language);

  const handleSend = () => {
    if (isParent && to.toLowerCase().includes('parent')) {
      alert("Parents cannot message other parents.");
      return;
    }

    const fullText = includeTip && selectedTip ? `${text}\n\n${selectedTip}` : text;

    sendMessage({
      from: currentUser.username,
      to,
      text: fullText,
      date: new Date().toLocaleString()
    });

    setText('');
    setTo('');
    setIncludeTip(false);
    setSelectedTip('');
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Send a Message</h3>
      <input
        type="text"
        placeholder="Send to (username)"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <textarea
        placeholder="Enter message text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', height: '80px', marginBottom: '10px' }}
      />
      {isNurse && (
        <>
          <label>
            <input
              type="checkbox"
              checked={includeTip}
              onChange={() => setIncludeTip(!includeTip)}
            /> Include a health tip
          </label>
          {includeTip && (
            <select
              value={selectedTip}
              onChange={(e) => setSelectedTip(e.target.value)}
              style={{ width: '100%', marginTop: '10px' }}
            >
              <option value="">Select a tip...</option>
              {healthTips.map((tip, index) => (
                <option key={index} value={tip}>{tip.slice(0, 40)}...</option>
              ))}
            </select>
          )}
        </>
      )}
      <button onClick={handleSend} style={{ marginTop: '10px' }}>Send Message</button>
    </div>
  );
};

export default MessageSend;