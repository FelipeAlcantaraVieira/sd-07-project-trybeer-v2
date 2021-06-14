import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
// import TrybeerContext from '../../context/TrybeerContext';
import {
  AdminSideBar,
} from '../../components';

const client = io('http://localhost:3002');

export default function Login() {
  // const [messageInput, setMessageInput] = useState('');
  const [allMessages, setAllMessages] = useState('');
  // const { clientEmail, setClientEmail } = useContext(TrybeerContext);
  // const verifyInput = () => {
  //   if (messageInput.length > 0) return false;
  //   return true;
  // };
  const [messageDetail, setMessageDetail] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const handleChange = (email) => {
    setMessageDetail(email);
  };

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
      messageInput, messageFrom: 'tryber@trybe.com.br', messageTo: messageDetail,
    });

    client.on('allMessage', async (messages) => {
      setAllMessages(messages);
    });
  };

  useEffect(() => {
    client.on('allMessage', async (messages) => {
      console.log('messages', messages);
      setAllMessages(messages);
    });
  }, []);

  console.log('allMessages', allMessages[messageDetail]);

  const getallUsers = ['user@test.com', 'moacyrrln@gmail.com'];

  return (
    <div>
      <AdminSideBar />
      { allMessages && !messageDetail
        && getallUsers.map((email, i) => (
          <p key={ i }>
            { allMessages[email][allMessages[email].length - 1].messageFrom }
            {' '}
            - Última mensagem às
            {
              allMessages[email][allMessages[email].length - 1]
                .data.split('T')[1].split(':')[0]
            }
            :
            {
              allMessages[email][allMessages[email].length - 1]
                .data.split('T')[1].split(':')[1]
            }
            <button
              type="button"
              value={ email }
              onClick={ () => handleChange(email) }
            >
              Acessar mensagens
            </button>
          </p>))}
      {
        allMessages[messageDetail]
        && (
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
              data-testid="signin-btn"
              disabled={ verifyInput() }
              onClick={ handleClickMessage }
            >
              Enviar
            </button>
          </p>)
      }
      {
        allMessages[messageDetail]
        && (allMessages[messageDetail].map((e, i) => (
          <p key={ i }>
            { e.messageFrom }
            {' '}
            -
            { e.data.split('T')[1].split(':')[0] }
            :
            { e.data.split('T')[1].split(':')[1] }
            {' '}
            -
            {' '}
            { e.messageInput }
          </p>)))
      }
    </div>
  );
}
