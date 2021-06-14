import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
// import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
// import TrybeerContext from '../../context/TrybeerContext';
=======
import { io } from 'socket.io-client';

>>>>>>> 7ce04f11bf8bbb20639014f49af99572626e69ee
import {
  AdminSideBar,
} from '../../components';

const client = io('http://localhost:3002');

<<<<<<< HEAD
export default function ChatAdmin() {
=======
export default function Login() {
>>>>>>> 7ce04f11bf8bbb20639014f49af99572626e69ee
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

  /* const verifyInput = () => {
    if (messageInput.length > 0) return false;
    return true;
  };

<<<<<<< HEAD
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
=======
  const handleChange = ({ target: { value } }) => {
    setMessageInput(value);
  }; */

  // const localStorag = JSON.parse(localStorage.getItem('user'));

  // const handleClick = () => {
  //   console.log(messageInput);
  //   setMessageInput('');

  //   console.log(localStorag.email);
  //   client.emit('sendMessageAdmin', {messageInput, messageFrom: 'tryber@trybe.com.br', messageTo: localStorag.email});

  //   client.on('allMessage', async (messages) => {
  //     setAllMessages(messages);
  //   })
  // };
>>>>>>> 7ce04f11bf8bbb20639014f49af99572626e69ee

  useEffect(() => {
    client.on('allMessage', async (messages) => {
      console.log('messages', messages);
      setAllMessages(messages);
    });
  }, []);

<<<<<<< HEAD
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
=======
  console.log('allMessages', allMessages);

  // const getallUsers = ['user@test.com'];

  return (
    <div>
      <TopMenu />
      {/* <label htmlFor="message">
        <input
          id="message"
          name="message"
          type="text"
          value={messageInput}
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
      </button> */}

      {/* { allMessages[localStorag.email]
        && allMessages[localStorag.email].map((e,i) => (
          <p>
          {e.email} - {e.data.split('T')[1].split(':')[0]}:{e.data.split('T')[1].split(':')[1]} - {e.messageInput}
          </p>))} */}

      { allMessages
      && allMessages['user@test.com'][allMessages['user@test.com'].length - 1].data}

>>>>>>> 7ce04f11bf8bbb20639014f49af99572626e69ee
    </div>
  );
}
