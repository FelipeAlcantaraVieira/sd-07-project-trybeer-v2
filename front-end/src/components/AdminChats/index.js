import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import socket from '../../helper/chat';


export default function AdminChatsList() {

  const [usersMessagesList, setusersMessagesList] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (usersMessagesList !== null) setLoading(true);
    socket.emit('adminUser', true);
    socket.on('adminListMessages', (list) => {
      setusersMessagesList(list)
    });
  });

  return (
    <div>
      <h1>Conversas</h1>
      <div 
        className="d-flex flex-column align-items-center"
        style={ { marginBottom: '23vh' } }
      >
          {loading ? usersMessagesList.map((userMessage, index) => (
            <Card
              type="button"
              key={ index }
              data-testid="containerChat"
              onClick={ () => history.push(`/admin/chats/user`) }
              role="button"
              onKeyDown={ () => history.push(`/admin/chats/user`) }
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
                <p data-testid="last-message">Última mensagem às {userMessage.time}</p>
                </Col>
              </Row>
            </Card>
          ))
            : (<p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>)
          }
      </div>
    </div>
  );
}
