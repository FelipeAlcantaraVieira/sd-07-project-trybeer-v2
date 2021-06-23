import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import { login } from '../../service/trybeerApi';

export default function Login() {
  const { login: loginAction } = useContext(TrybeerContext);
  const [shouldRedirect, setShouldRedirect] = useState('');
  const [loginException, setLoginException] = useState();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const verifyInput = () => {
    const { email, password } = loginInfo;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordMinLength = 6;
    const validPassword = password.length >= passwordMinLength;
    return validEmail && validPassword;
  };

  const handleChange = ({ target: { name, value } }) => {
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const { email, password } = loginInfo;
    const result = await login(email, password);
    if (!result.error) {
      loginAction({ ...result });
      return setShouldRedirect(result.role);
    }
    setLoginException(<p>{result.error}</p>);
  };

  if (shouldRedirect) {
    return (<Redirect
      to={ `/${shouldRedirect === 'administrator' ? 'admin/orders' : 'products'}` }
    />);
  }

  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          id="email"
          name="email"
          type="text"
          data-testid="email-input"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="password">
        Senha:
        <input
          id="password"
          name="password"
          type="password"
          onChange={ handleChange }
          data-testid="password-input"
        />
      </label>

      <button
        type="button"
        data-testid="signin-btn"
        disabled={ !verifyInput() }
        onClick={ handleClick }
      >
        Entrar
      </button>

      <Link
        to="/register"
        data-testid="no-account-btn"
      >
        Ainda não tenho conta
      </Link>
      {loginException}
    </div>
  );
}
