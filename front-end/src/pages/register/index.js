import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import { nameIsValid, passwordIsValid, emailIsValid } from '../../service/validateInputs';
import { register, login } from '../../service/trybeerApi';

export default function Register() {
  const { login: loginAction } = useContext(TrybeerContext);
  const [shouldRedirect, setShouldRedirect] = useState('');
  const [loginException, setLoginException] = useState();
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
    seller: false,
  });

  const verifyInput = () => {
    const { name, email, password } = registerInfo;
    return nameIsValid(name) && passwordIsValid(password) && emailIsValid(email);
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setRegisterInfo({
      ...registerInfo,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const { name, email, password, seller } = registerInfo;
    const role = (seller === false ? 'client' : 'administrator');
    const RegisterResult = await register(name, email, password, role);
    const loginResult = await login(email, password);
    if (!RegisterResult.error) {
      loginAction({ ...loginResult });
      setShouldRedirect(role);
    }
    setLoginException(<p>{RegisterResult.error}</p>);
  };

  if (shouldRedirect) {
    return (<Redirect
      to={ `/${shouldRedirect === 'administrator' ? 'admin/orders' : 'products'}` }
    />);
  }

  return (
    <div>
      <label htmlFor="name">
        Nome:
        <input
          id="name"
          name="name"
          type="text"
          data-testid="signup-name"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="email">
        Email:
        <input
          id="email"
          name="email"
          type="text"
          data-testid="signup-email"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password">
        Senha:
        <input
          id="password"
          name="password"
          type="password"
          data-testid="signup-password"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="seller">
        Quero vender
        <input
          id="seller"
          name="seller"
          type="checkbox"
          data-testid="signup-seller"
          onChange={ handleChange }
        />
      </label>

      <button
        type="button"
        data-testid="signup-btn"
        disabled={ !verifyInput() }
        onClick={ handleClick }
      >
        Cadastrar
      </button>
      {loginException}
    </div>
  );
}
