import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import socket from '../../helper/chat';
import ApiContext from '../../context/context';

export default function AdminChat() {
  const { userMessages } = useContext(ApiContext);
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [serverMessage, setServerMessage] = useState(userMessages);
  const [userName, setUserName] = useState('Loja');

  useEffect(() => {
    socket.emit('isAdmin', true);
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('adminMessage', { userName, message });
    setMessage('');
  };

  const sendUserEmail = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    setUserName(email);
  };

  useEffect(() => {
    socket.on('loadAdminMessage', (incomingMessage) => setServerMessage(incomingMessage));
    sendUserEmail();
  }, []);

  return (
    <div>
      <h1>Chat do Admin</h1>
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
      <button
        type="button"
        data-testid="back-button"
        onClick={ () => history.push('/admim/chats') }
      >
        Voltar
      </button>
    </div>
  );
}
