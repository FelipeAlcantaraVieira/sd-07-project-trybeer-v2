import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import AdminChats from '../../components/AdminChats';
import AuthVerification from '../../components/AuthVerification';
import socket from '../../helper/chat';

const AdminChatsPage = () => {
  AuthVerification();
  return (
    <div>
      <Header title="Chats com os usuários" />
      <Container style={ { height: '100vh' } }>
        <AdminChats />

      </Container>
    </div>
  );
};

export default AdminChatsPage;
