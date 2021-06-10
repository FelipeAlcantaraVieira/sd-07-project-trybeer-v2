import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from '../../components/LoginForm';
import './login.css';

const Login = () => (
  <div className="login">
    <Container
      fluid
      style={ {
        height: '100vh',
        paddingTop: '150px',
        paddingLeft: '100px',
        width: '70vh',
        color: 'rgb(227,183,88)',
      } }
    >
      <h1>Login</h1>
      <LoginForm />
    </Container>
  </div>
);

export default Login;
