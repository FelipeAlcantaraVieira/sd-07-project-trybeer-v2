import React, { useEffect, useState, useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import socket from '../../helper/chat';
import ApiContext from '../../context/context';

export default function AdminChatsList() {
  const [usersMessagesList, setusersMessagesList] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { setUserMessages } = useContext(ApiContext);

  useEffect(() => {
    socket.on('adminListMessages', (list) => {
      setusersMessagesList(list);
    });
    if (usersMessagesList !== null) setLoading(false);
  }, [usersMessagesList]);

  const singleUserMessages = (userName) => {
    socket.emit('loadAdminMessage', userName);
    socket.on('loadAdminMessage', (messages) => setUserMessages(messages));
    history.push('/admin/chats/user');
  };

  return (
    <div>
      <h1>Conversas</h1>
      <div
        className="d-flex flex-column align-items-center"
        style={ { marginBottom: '23vh' } }
      >
        {loading ? (<p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>) : (usersMessagesList.map((userMessage, index) => (
          <Card
            type="button"
            key={ index }
            data-testid="containerChat"
            onClick={ () => singleUserMessages(userMessage.userName) }
            role="button"
            onKeyDown={ () => singleUserMessages(userMessage.userName) }
            tabIndex={ 0 }
            className="border rounded"
            style={ { margin: '3vh',
              width: '90vh',
              backgroundColor: 'rgb(0,0,0,0.5)',
              color: 'white',
              padding: '3vh' } }
          >
            <Row>
              <Col>
                <p data-testid="profile-name">{userMessage.userName}</p>
              </Col>
              <Col>
                <p data-testid="last-message">
                  Última mensagem às
                  {userMessage.time}
                </p>
              </Col>
            </Row>
          </Card>
        )))
        }
      </div>
    </div>
  );
}
