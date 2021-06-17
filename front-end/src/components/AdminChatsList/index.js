import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import socket from '../../helper/chat';

export default function AdminChatsList() {
  const [usersMessagesList, setusersMessagesList] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    socket.emit('adminListMessages');
    socket.on('adminListMessages', (list) => {
      setusersMessagesList(list);
      if (list.length > 0) setLoading(false);
    });
  }, [setusersMessagesList]);

  const singleUserMessages = ({ userName }) => {
    socket.emit('loadUser', userName);
    history.push('/admin/chats/user');
  };

  return (
    <div
      style={ {
        margin: '20px',
      } }
    >
      <h1
        style={ {
          margin: '20px',
        } }
      >
        Conversas
      </h1>
      <div
        className="d-flex flex-column align-items-center"
        style={ { marginBottom: '23vh' } }
      >
        {loading ? (
          <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>)
          : (
            usersMessagesList.map((user, index) => (
              <Card
                type="button"
                key={ index }
                data-testid="containerChat"
                onClick={ () => singleUserMessages(user) }
                role="button"
                onKeyDown={ () => singleUserMessages(user) }
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
                    <p data-testid="profile-name">{user.userName}</p>
                  </Col>
                  <Col>
                    <p data-testid="last-message">
                      Última mensagem às
                      {' '}
                      {user.time}
                    </p>
                  </Col>
                </Row>
              </Card>
            )))}
      </div>
    </div>
  );
}
