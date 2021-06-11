import React, { useEffect, useState } from 'react';
import socket from '../../helper/chat';

export default function ClientChat() {
  const [message, setMessage] = useState('');
  const [serverMessage, setServerMessage] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket.on('serverMessage', (message) => setServerMessage(message));
    console.log('Chamou 2')
  });
  
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('userMessage', {userName, message});
    setMessage('');
  };

  useEffect(() => {
    sendUserEmail();
    console.log('Chamou')
  },[]);

  const sendUserEmail = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    socket.emit('loadMessages', email)
    setUserName(email);
  };

  return (
    <div>
      <h1>Chat do Usuário</h1>
      <ul id="messageList">
        {serverMessage.map(({message, userName, time }, index) => (
          <li key={index}>
            <span data-testid="nickname">{userName}</span> -
            <span data-testid="message-time">{time}</span>
            <br />
            <span data-testid="text-message">{message}</span>
          </li>
        ))}
      </ul>
      <form>
        <input
          placeholder="Mensagem"
          id="messageInput" 
          value={message}
          onChange={ (e) => { setMessage(e.target.value)} }
          data-testid="message-input"
        />
        <button
          id="sendMessage"
          onClick={(e) => sendMessage(e)}
          data-testid="send-message"
         >Enviar</button>
      </form>
    </div>
  );
}
