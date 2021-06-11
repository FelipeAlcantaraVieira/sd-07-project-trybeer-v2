import React, { useEffect, useState } from 'react';
import socket from '../../helper/chat';

export default function ClientChat() {

  const [message, setMessage] = useState('');
  const [serverMessage, setServerMessage] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket.on('serverMessage', (incomingMessage) => setServerMessage(incomingMessage));
    console.log('Chamou 2');
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('userMessage', { userName, message });
    setMessage('');
  };

  const sendUserEmail = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    socket.emit('loadMessages', email);
    setUserName(email);
  };

  useEffect(() => {
    sendUserEmail();
    console.log('Chamou');
  }, []);

  return (
    <div>
      <h1>Chat do Usuário</h1>
      <ul id="messageList">
        {serverMessage.map((messageContent, index) => (
          <li key={ index }>
            <span data-testid="nickname">{messageContent.userName}</span>
            {' '}
            -
            <span data-testid="message-time">{messageContent.time}</span>
            <br />
            <span data-testid="text-message">{messageContent.message}</span>
          </li>
        ))}
      </ul>
      <form>
        <input
          placeholder="Mensagem"
          id="messageInput"
          value={ message }
          onChange={ (e) => { e.preventDefault(); setMessage(e.target.value); } }
          data-testid="message-input"
        />
        <button
          type="submit"
          id="sendMessage"
          onClick={ (e) => sendMessage(e) }
          data-testid="send-message"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
