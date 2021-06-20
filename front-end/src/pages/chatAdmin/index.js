import React, { useState, useEffect, useContext } from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import { AdminSideBar } from '../../components';

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
    <div>
      <AdminSideBar />

      {!allMessages.messages ? (
        <p>Carregando</p>
      ) : (
        <div>
          <h1>{`Conversando com ${allMessages.client}`}</h1>
          <button
            type="button"
            data-testid="back-button"
            onClick={ () => history.push('/admin/chats') }
          >
            VOLTAR
          </button>
          {allMessages.messages.map((message, i) => (
            <div key={ i }>
              <p>
                <span data-testid="nickname">{`${message.from} - `}</span>
                <span data-testid="message-time">{message.date}</span>
              </p>
              <p data-testid="text-message">{message.text}</p>
            </div>
          ))}
        </div>
      )}

      <p>
        <label htmlFor="message">
          <input
            id="message"
            name="message"
            type="text"
            value={ messageInput }
            data-testid="message-input"
            onChange={ handleChangeMessage }
          />
        </label>

        <button
          type="button"
          data-testid="send-message"
          disabled={ verifyInput() }
          onClick={ handleClickMessage }
        >
          Enviar
        </button>
      </p>
    </div>
  );
}
