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

    client.on('allMessage', async (messages) => {
      setAllMessages(messages);
    });
  };

  useEffect(() => {
    client.on('allMessage', async (messages) => {
      setAllMessages(messages);
    });
  }, []);

  if (allMessages[localStorag.email] === undefined) {
    client.emit('createClient', localStorag.email);
    client.on('createdClient', (messages) => {
      const add = { ...allMessages, ...messages };
      setAllMessages(add);
    });
  }

  console.log('allMessages', allMessages);
  console.log('localStorag.email', localStorag.email);
  console.log('passou aqui');
  console.log('allMessages', allMessages[localStorag.email]);

  return (
    <div>
      <TopMenu />
      <label htmlFor="message">
        <input
          id="message"
          name="message"
          type="text"
          value={ messageInput }
          data-testid="message-input"
          onChange={ handleChange }
        />
      </label>

      <button
        type="button"
        data-testid="signin-btn"
        disabled={ verifyInput() }
        onClick={ handleClick }
      >
        Enviar
      </button>

      { allMessages[localStorag.email] && allMessages[localStorag.email].map((e, i) => (
        <p key={ i }>
          {e.messageFrom}
          {' '}
          -
          {' '}
          {e.data.split('T')[1].split(':')[0]}
          :
          {e.data.split('T')[1].split(':')[1]}
          {' '}
          -
          {' '}
          {e.messageInput}
        </p>))}
    </div>
  );
}
