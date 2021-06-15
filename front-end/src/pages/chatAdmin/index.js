import React, { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import TrybeerContext from '../../context/TrybeerContext';
import {
  AdminSideBar,
} from '../../components';

const client = io('http://localhost:3002');

export default function ChatAdmin() {
  const [allMessages, setAllMessages] = useState([]);
  const { clientEmail } = useContext(TrybeerContext);
  const [messageInput, setMessageInput] = useState('');

  const verifyInput = () => {
    if (messageInput.length > 0) return false;
    return true;
  };

  const handleChangeMessage = ({ target: { value } }) => {
    setMessageInput(value);
  };

  const handleClickMessage = () => {
    console.log(messageInput);
    setMessageInput('');
    client.emit('sendMessageAdmin', {
      messageInput, messageTo: clientEmail,
    });
  };

  useEffect(() => {
    client.emit('createClient', clientEmail);
    client.on('createdClient', (messages) => {
      setAllMessages(messages);
    });

    client.on('allMessage', async (messages) => {
      console.log('messages', messages);
      setAllMessages(messages);
    });
  }, [clientEmail]);

  return (
    <div>
      <AdminSideBar />
      <p>
        <label htmlFor="message">
          <input
            id="message"
            name="message"
            type="text"
            value={messageInput}
            data-testid="message-input"
            onChange={handleChangeMessage}
          />
        </label>

        <button
          type="button"
          data-testid="signin-btn"
          disabled={verifyInput()}
          onClick={handleClickMessage}
        >
          Enviar
        </button>
      </p>
      {allMessages && allMessages.messages && allMessages.messages.map((e, i) => (
        <p key={i}>
          {e.from}
          {' '}
          -
          {' '}
          {e.date.split('T')[1].split(':')[0]}
          :
          {e.date.split('T')[1].split(':')[1]}
          {' '}
          -
          {' '}
          {e.text}
        </p>))}
    </div>
  );
}
