import React from 'react';
import { Container } from 'react-bootstrap';
import ClientProfile from '../../components/ClientProfile';
import Header from '../../components/Header';
import './profile.css';

const ClientProfilePage = () => (
  <div className="profile">
    <Header title="Meu perfil" />
    <Container
      fluid
      style={ {
        height: '100vh',
        paddingTop: '50px',
        width: '70vh',
        color: 'rgb(227,183,88)',
      } }
    >
      <ClientProfile />
    </Container>
  </div>
);

export default ClientProfilePage;
