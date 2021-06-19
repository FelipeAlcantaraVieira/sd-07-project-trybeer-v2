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

  useEffect(() => {
    client.emit('createClient', userLogged.email);
    client.on('createdClient', (messages) => {
      setAllMessages(messages);
    });

    client.on('allMessage', async (messages) => {
      setAllMessages(messages);
    });
  }, [userLogged.email]);

  console.log('allMessages', allMessages);

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
        data-testid="send-message"
        disabled={ verifyInput() }
        onClick={ handleClick }
      >
        Enviar
      </button>

      {!allMessages.messages ? (
        <p>Carregando</p>
      ) : (
        <div>
          {allMessages.messages.map((message, i) => (
            <div key={ i }>
              <p>
                <span data-testid="nickname">
                  {`${allMessages.client} - `}
                </span>
                <span data-testid="message-time">
                  {message.date}
                </span>
              </p>
              <p data-testid="text-message">{message.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
