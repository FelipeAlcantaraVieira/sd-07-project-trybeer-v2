import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import AdminChatsList from '../../components/AdminChatsList';
import AuthVerification from '../../components/AuthVerification';

const AdminChatsPage = () => {
  AuthVerification();
  return (
    <div>
      <Header title="Chats com os usuários" />
      <Container style={ { height: '100vh' } }>
        <AdminChatsList />
      </Container>
    </div>
  );
};

export default AdminChatsPage;
