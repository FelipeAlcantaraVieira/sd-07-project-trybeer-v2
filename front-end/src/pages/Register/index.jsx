import React from 'react';
import './login.css';
import { Container } from 'react-bootstrap';
import CreateUserForm from '../../components/CreateUserForm';

const Register = () => (
  <div className="signup" style={ { height: '100vh' } }>
    <h1
      style={ {
        paddingLeft: '100px',
        color: 'rgb(227,183,88)',
        textShadow: '2px 2px black',
      } }
      data-testid="top-title"
    >
      Registro
    </h1>
    <Container fluid style={ { width: '450px', heigth: '80vh' } }>
      <CreateUserForm />
    </Container>
  </div>
);

export default Register;
