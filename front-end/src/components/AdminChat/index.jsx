import React, { useEffect, useState, useContext } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import socket from '../../helper/chat';
import ApiContext from '../../context/context';

export default function AdminChat() {
  const { userMessages } = useContext(ApiContext);
  const history = useHistory();
  const [message, setMessage] = useState('');
  const [serverMessage, setServerMessage] = useState(userMessages);
  const [userName, setUserName] = useState('Loja');

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('adminMessage', { userName, message });
    setMessage('');
  };

  const sendUserEmail = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserName(user);
  };
  useEffect(() => {
    if (userMessages.length < 1) {
      socket
        .emit('loadMessages');
    }
    socket.on('loadMessages', (messages) => setServerMessage(messages));
    sendUserEmail();
  }, [userMessages.length]);

  useEffect(() => {
    socket
      .on('serverMessage',
        (incomingMessage) => setServerMessage([...serverMessage, incomingMessage]));
  }, [serverMessage]);

  return (
    <Form>
      <div>
        <h1
          style={ {
            marginTop: '20px',
          } }
        >
          Chat do Admin
        </h1>
        <div
          style={ {
            maxHeight: '500px',
            overflow: 'scroll',
            overflowX: 'hidden',
          } }
        >
          <ul
            id="messageList"
            style={ {
              display: 'flex',
              flexDirection: 'column',
              marginTop: '20px',
            } }
          >
            {serverMessage
              .map((messageContent, index) => (messageContent.userName === 'Loja' ? (
                <li
                  key={ index }
                  style={ {
                    borderRadius: '5px',
                    position: 'relative',
                    padding: '5px 10px',
                    background: '#d2d6de',
                    border: '1px solid #d2d6de',
                    marginRight: '30px',
                    marginBottom: '10px',
                    color: '#444',
                    listStyle: 'none',
                    maxWidth: '350px',
                    wordBreak: 'break-all',
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'flex-end',
                  } }
                >
                  <div>
                    <span
                      data-testid="nickname"
                      style={ {
                        marginBottom: '2px',
                        fontSize: '12px',
                      } }
                    >
                      {messageContent.userName}
                    </span>
                    {' '}
                    -
                    {' '}
                    <span
                      data-testid="message-time"
                      style={ {
                        marginBottom: '2px',
                        fontSize: '12px',
                      } }
                    >
                      {messageContent.time}
                    </span>
                    <br />
                  </div>
                  <span data-testid="text-message">
                    {messageContent.message === '' ? (
                      <br />
                    ) : (
                      messageContent.message
                    )}
                  </span>
                </li>
              ) : (
                <li
                  key={ index }
                  style={ {
                    borderRadius: '5px',
                    position: 'relative',
                    padding: '5px 10px',
                    background: '#f39c12',
                    border: '1px solid #f39c12',
                    marginRight: '30px',
                    marginBottom: '10px',
                    color: '#444',
                    listStyle: 'none',
                    maxWidth: '350px',
                    wordBreak: 'break-all',
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: 'start',
                  } }
                >
                  <div>
                    <span
                      data-testid="nickname"
                      style={ {
                        marginBottom: '2px',
                        fontSize: '12px',
                      } }
                    >
                      {messageContent.userName}
                    </span>
                    {' '}
                    -
                    {' '}
                    <span
                      data-testid="message-time"
                      style={ {
                        marginBottom: '2px',
                        fontSize: '12px',
                      } }
                    >
                      {messageContent.time}
                    </span>
                  </div>
                  <span data-testid="text-message">
                    {messageContent.message === '' ? (
                      <br />
                    ) : (
                      messageContent.message
                    )}
                  </span>
                </li>
              )))}
          </ul>
        </div>
        <Form.Row
          style={ {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
          } }
        >
          <Col
            xs={ 8 }
            style={ {
              display: 'flex',
            } }
          >
            <Form.Control
              placeholder="Digite sua mensagem"
              id="messageInput"
              value={ message }
              onChange={ (e) => {
                e.preventDefault();
                setMessage(e.target.value);
              } }
              data-testid="message-input"
              style={ {
                padding: '10px',
                background: '#eee',
                display: 'flex',
                justifyContent: 'center',
              } }
            />
            <Button
              type="submit"
              id="sendMessage"
              onClick={ (e) => sendMessage(e) }
              data-testid="send-message"
              style={ {
                marginLeft: '10px',
                background: 'rgb(0, 196, 65)',
                color: '#fff',
                fontWeight: 'bold',
                cursor: 'pointer',
              } }
            >
              Enviar
            </Button>
          </Col>
        </Form.Row>
        <Button
          type="button"
          data-testid="back-button"
          onClick={ () => history.push('/admin/chats') }
          style={ {
            marginTop: '20px',
          } }
        >
          Voltar
        </Button>
      </div>
    </Form>
  );
}
