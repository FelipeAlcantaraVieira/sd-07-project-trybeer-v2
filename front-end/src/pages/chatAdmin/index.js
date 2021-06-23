import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import { AdminSideBar } from '../../components';
import './style.css';

const client = io('http://localhost:3002');

export default function ChatAdmin() {
  const history = useHistory();
  const [allMessages, setAllMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const { clientEmail } = useContext(TrybeerContext);

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
      messageInput,
      messageTo: clientEmail,
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
    <div className="list-chats-admin-container">
      <AdminSideBar />

      {!allMessages.messages ? (
        <p>Carregando</p>
      ) : (
        <div className="chat-container">
          <div className="title-chat-container">
            <h1>
              {'Conversando com '}
              <span>{allMessages.client}</span>
            </h1>
          </div>
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
        </div>
      )}

      <div className="send-message-container">
        <label htmlFor="message" />
        <input
          id="message"
          name="message"
          type="text"
          value={ messageInput }
          placeholder="Digite sua mensagem aqui"
          data-testid="message-input"
          onChange={ handleChangeMessage }
        />

        <button
          type="button"
          className="button-final"
          data-testid="send-message"
          disabled={ verifyInput() }
          onClick={ handleClickMessage }
        >
          Enviar
        </button>
        <button
          type="button"
          className="button-final"
          data-testid="back-button"
          onClick={ () => history.push('/admin/chats') }
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
