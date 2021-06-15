import React, { useEffect, useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';
import socket from '../../helper/chat';

export default function ClientChat() {
  const [message, setMessage] = useState('');
  const [serverMessage, setServerMessage] = useState([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    socket.on('serverMessage', (incomingMessage) => setServerMessage(incomingMessage));
    console.log('Chamou 2');
  });

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('userMessage', { userName, message });
    setMessage('');
  };

  const sendUserEmail = () => {
    const { email } = JSON.parse(localStorage.getItem('user'));
    socket.emit('loadMessages', email);
    setUserName(email);
  };

  useEffect(() => {
    sendUserEmail();import React, { useEffect, useState } from 'react';
    import socket from '../../helper/chat';
    
    export default function ClientChat() {
      const [message, setMessage] = useState('');
      const [serverMessage, setServerMessage] = useState([]);
      const [userName, setUserName] = useState('');
    
      useEffect(() => {
        socket.on('serverMessage', (incomingMessage) => setServerMessage(incomingMessage));
      });
    
      const sendMessage = (e) => {
        e.preventDefault();
        socket.emit('userMessage', { userName, message });
        setMessage('');
      };
    
      const sendUserEmail = () => {
        const { email } = JSON.parse(localStorage.getItem('user'));
        socket.emit('loadMessages', email);
        setUserName(email);
      };
    
      useEffect(() => {
        sendUserEmail();
      }, []);
    
      return (
        <div>
          <h1>Chat do Usuário</h1>
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
        </div>
      );
    }
    
    console.log('Chamou');
  }, []);

  return (
    <Form>
      <div>
        <h1>Chat do Usuário</h1>
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
              alignItems: 'flex-end',
              marginTop: '20px',
            } }
          >
            {serverMessage.map((messageContent, index) => (
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
                  display: 'inline-block',
                  wordBreak: 'break-all',
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
                  {messageContent.message === ''
                    ? <br />
                    : messageContent.message}
                </span>
              </li>
            ))}
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
              onChange={ (e) => { e.preventDefault(); setMessage(e.target.value); } }
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
      </div>
    </Form>
  );
}
