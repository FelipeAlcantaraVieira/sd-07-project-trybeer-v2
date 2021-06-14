import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import AdminChat from '../../components/AdminChat';
import AuthVerification from '../../components/AuthVerification';

const AdminChatPage = () => {
  AuthVerification();
  return (
    <div>
      <Header title="Chats com os usuários" />
      <Container style={ { height: '100vh' } }>
        <AdminChat />
      </Container>
    </div>
  );
};

export default AdminChatPage;
