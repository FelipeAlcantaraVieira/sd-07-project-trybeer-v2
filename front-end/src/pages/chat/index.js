import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  TopMenu,
} from '../../components';

const client = io('http://localhost:3002');

export default function Login() {
  const [messageInput, setMessageInput] = useState('');
  const [allMessages, setAllMessages] = useState('');

  const verifyInput = () => {
    if (messageInput.length > 0) return false;
    return true;
  };

  const handleChange = ({ target: { value } }) => {
    setMessageInput(value);
  };

  const localStorag = JSON.parse(localStorage.getItem('user'));

  const handleClick = () => {
    console.log(messageInput);
    setMessageInput('');
    console.log(localStorag.email);
    client.emit('sendMessage', {
      messageInput, messageFrom: localStorag.email, messageTo: 'tryber@trybe.com.br',
    });
  };

  useEffect(() => {
    if (allMessages && allMessages[localStorag.email] === undefined) {
      client.emit('createClient', localStorag.email);
    }

    client.on('createdClient', (messages) => {
      setAllMessages(messages);
    });

    client.on('allMessage', async (messages) => {
      setAllMessages(messages);
    });
  }, [allMessages, localStorag.email]);

  console.log('allMessages', allMessages);

  return (
    <div>
      <TopMenu />
      <label htmlFor="message">
        <input
          id="message"
          name="message"
          type="text"
          value={messageInput}
          data-testid="message-input"
          onChange={handleChange}
        />
      </label>

      <button
        type="button"
        data-testid="signin-btn"
        disabled={verifyInput()}
        onClick={handleClick}
      >
        Enviar
      </button>

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
