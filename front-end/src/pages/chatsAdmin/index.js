import React, { useState, useEffect } from 'react';
import {
  AdminSideBar,
} from '../../components';
import { getAllMessage } from '../../service/trybeerApi'

export default function ChatsAdmin() {
  const [allMessage, setAllMessage] = useState([]);
  // const [messageDetail, setMessageDetail] = useState(false);

  // const handleChange = (email) => {
  //   setMessageDetail(email);
  // };

  // const verifyInput = () => {
  //   if (messageInput.length > 0) return false;
  //   return true;
  // };

  // const handleChangeMessage = ({ target: { value } }) => {
  //   setMessageInput(value);
  // };

  // const handleClickMessage = () => {
  //   console.log(messageInput);
  //   setMessageInput('');
  //   client.emit('sendMessageAdmin', {
  //     messageInput, messageFrom: 'tryber@trybe.com.br', messageTo: messageDetail,
  //   });

  //   client.on('allMessage', async (messages) => {
  //     setAllMessages(messages);
  //   });
  // };

  useEffect(() => {
    requestAllMessage();
  }, []);

  const requestAllMessage = async () => {
    const allMessage = await getAllMessage();
    console.log(allMessage);
    setAllMessage(allMessage);
  }
  if (!allMessage.length) return (<p>Nenhuma Conversa Aqui</p>)
  return (
    <div>
      <AdminSideBar />
      { allMessage.map((e, i) =>
        <div key={i}>
          <p data-testid="profile-name" >{e.client}</p>
          <p data-testid="last-message" >{`Última menssagem às ${e.timeLastMessage}`}</p>
        </div>)}

      {/* { allMessages && !messageDetail
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
      } */}
    </div>
  );
}
