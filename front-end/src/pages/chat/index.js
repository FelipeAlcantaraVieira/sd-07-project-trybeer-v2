import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { TopMenu } from '../../components';
import TrybeerContext from '../../context/TrybeerContext';

const client = io('http://localhost:3002');

export default function Login() {
  const [messageInput, setMessageInput] = useState('');
  const [allMessages, setAllMessages] = useState('');
  const { userLogged } = useContext(TrybeerContext);

  const verifyInput = () => {
    if (messageInput.length > 0) return false;
    return true;
  };

  const handleChange = ({ target: { value } }) => {
    setMessageInput(value);
  };

  const handleClick = () => {
    console.log(messageInput);
    setMessageInput('');
    client.emit('sendMessage', {
      messageInput,
      messageFrom: userLogged.email,
      messageTo: 'tryber@trybe.com.br',
    });
  };

  const updateAllMessages = (event) => {
    client.on(event, (messages) => {
      if (messages) {
        setAllMessages(messages);
      }
    });
  };

  useEffect(() => {
    client.emit('createClient', userLogged.email);
    updateAllMessages('createdClient');
    updateAllMessages('allMessage');
  }, [userLogged.email]);

  return (
    <div className="list-chats-admin-container">
      <TopMenu />

      <div className="chat-container">
        {!allMessages.messages ? (
          <p className="message-container">Não existe mensagens</p>
        ) : (
          <div className="all-messagens-container">
            {allMessages.messages.map((message, i) => (
              <div
                key={ i }
                className={
                  message.from === allMessages.client
                    ? 'message-container-client'
                    : 'message-container-adm'
                }
              >
                <p>
                  <span
                    data-testid="nickname"
                    className={
                      message.from === allMessages.client ? 'client' : 'admin'
                    }
                  >
                    {`${message.from} - `}
                  </span>
                  <span
                    data-testid="message-time"
                    className={
                      message.from === allMessages.client ? 'client' : 'admin'
                    }
                  >
                    {message.date}
                  </span>
                </p>
                <p data-testid="text-message">{message.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="send-message-container">
        <label htmlFor="message" />
        <input
          id="message"
          name="message"
          type="text"
          className="input-message"
          placeholder="Digite sua mensagem aqui"
          value={ messageInput }
          data-testid="message-input"
          onChange={ handleChange }
        />

        <button
          type="button"
          className="button-final"
          data-testid="send-message"
          disabled={ verifyInput() }
          onClick={ handleClick }
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
