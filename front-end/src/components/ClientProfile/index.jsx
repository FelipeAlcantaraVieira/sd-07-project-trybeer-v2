import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { updateUser } from '../../services/apiService';
import validationClientProfile from './validationClientProfile';

export default function ClientProfile() {
  const [name, setName] = useState('');
  const [nameUpdate, setNameUpdate] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('user'));

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const user = {
      name,
      email: currentUser.email,
    };
    // req da api enviando:
    const response = await updateUser(currentUser.token, user)
      .then((apiResponse) => apiResponse);
    if (response) setNameUpdate(true);
  };

  return (
    <Form
      onSubmit={ onSubmitHandler }
      style={ {
        marginRight: '20vh',
      } }
    >
      <Form.Label htmlFor="nameInput">
        Nome
      </Form.Label>
      <Col>
        <Form.Control
          id="nameInput"
          style={ {
            background: 'transparent',
            marginBottom: '10px',
            color: 'white',
          } }
          value={ name }
          onChange={ (e) => setName(e.target.value) }
          type="text"
          name="name"
          data-testid="profile-name-input"
          required
        />
      </Col>

      <Form.Label htmlFor="profile-email-input">
        Email
      </Form.Label>
      <Col>
        <Form.Control
          style={ {
            background: 'transparent',
            marginBottom: '20px',
            color: 'white',
          } }
          value={ currentUser.email }
          type="email"
          name="email"
          data-testid="profile-email-input"
          readOnly
        />
      </Col>
      <Row>
        <Col>
          <Button
            style={ {
              backgroundColor: 'rgb(227,183,88)',
              borderColor: 'white',
            } }
            type="submit"
            data-testid="profile-save-btn"
            disabled={ validationClientProfile(name) }
          >
            Salvar
          </Button>
        </Col>
      </Row>

      { nameUpdate && <span>Atualização concluída com sucesso</span> }
    </Form>
  );
}
