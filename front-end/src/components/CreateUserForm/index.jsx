import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import validateRegister from './validation';
import { registerUser } from '../../services/apiService';

const rgbBgColor = 'rgb(119, 34, 16, 0.2)';
const rgbBorderColor = 'rgb(119, 34, 16, 0.5)';

function CreateUserForm() {
  // Estados de campos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');
  const [iWantToSell, setiWantToSell] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const history = useHistory();

  const handleRole = () => {
    setiWantToSell(!iWantToSell);
    if (!iWantToSell) return setRole('administrator');
    return setRole('client');
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      role,
    };
    validateRegister(user);

    const response = await registerUser(user).then(
      (apiResponse) => apiResponse,
    );
    if (response.err) return setUserExists(true);
    setUserExists(false);

    if (response) {
      localStorage.setItem('user', JSON.stringify(response));
    }

    if (role === 'administrator') {
      history.push('/admin/orders');
    }

    if (role === 'client') {
      history.push('/products');
    }
  };

  return (
    <Form onSubmit={ onSubmitHandler } style={ { paddingTop: '20px' } }>
      <Form.Row>
        <Form.Label htmlFor="signup-name">Nome</Form.Label>
        <Form.Control
          style={ {
            background: rgbBgColor,
            borderColor: rgbBorderColor,
          } }
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          placeholder="Nome Completo"
          type="text"
          name="name"
          data-testid="signup-name"
          required
        />
      </Form.Row>
      <Form.Row className="mt-2">
        <Form.Label htmlFor="signup-email">Email</Form.Label>
        <Form.Control
          style={ {
            background: rgbBgColor,
            borderColor: rgbBorderColor,
          } }
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          placeholder="Email address"
          type="email"
          name="email"
          data-testid="signup-email"
          required
        />
        {userExists && (
          <span style={ { color: 'red' } }>
            Já existe um usuário com esse e-mail.
          </span>
        )}
      </Form.Row>
      <Form.Row className="mt-2">
        <Form.Label htmlFor="signup-password">Senha</Form.Label>
        <Form.Control
          style={ {
            background: rgbBgColor,
            borderColor: rgbBorderColor,
          } }
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          placeholder="Password"
          type="password"
          name="password"
          data-testid="signup-password"
          required
        />
      </Form.Row>
      <Form.Row className="mt-2">
        <Form.Check
          className="mt-2"
          data-testid="signup-seller"
          checked={ iWantToSell }
          onChange={ handleRole }
          label="Quero vender"
          type="checkbox"
        />
      </Form.Row>
      <Form.Row className="justify-content-center">
        <Button
          style={ {
            background: rgbBgColor,
            borderColor: rgbBorderColor,
          } }
          className="mt-4"
          type="submit"
          disabled={ validateRegister(name, email, password) }
          data-testid="signup-btn"
        >
          Cadastrar
        </Button>
      </Form.Row>
    </Form>
  );
}
export default CreateUserForm;
