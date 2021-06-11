import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import ClientChat from '../../components/ClientChat';
import AuthVerification from '../../components/AuthVerification';

const ClientChatPage = () => {
  AuthVerification();

  return (
    <div>
      <Header title="Chat com a loja" />
      <Container style={ { height: '100vh' } }>
        <ClientChat />
      </Container>
    </div>
  );
};

export default ClientChatPage;
