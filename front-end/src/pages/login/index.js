import React, { useState, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import TrybeerContext from '../../context/TrybeerContext';
import { login } from '../../service/trybeerApi';
import './style.css';

export default function Login() {
  const { login: loginAction } = useContext(TrybeerContext);
  const [shouldRedirect, setShouldRedirect] = useState('');
  const [loginException, setLoginException] = useState('');
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
    setLoginException(<p className="error">{result.error}</p>);
  };

  if (shouldRedirect) {
    return (
      <Redirect
        to={ `/${
          shouldRedirect === 'administrator' ? 'admin/orders' : 'products'
        }` }
      />
    );
  }

  return (
    <div className="page-body">
      <h1 className="title">
        <span className="try-title">Try</span>
        Bebos
      </h1>

      <div className="form-container">
        <div className="inputs-container">
          <div className="inputs-sub-container">
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
          </div>

          <div className="inputs-sub-container">
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
          </div>
        </div>

        <div className="btn-container">
          <button
            type="button"
            id="btn-submit"
            data-testid="signin-btn"
            disabled={ !verifyInput() }
            className={ !verifyInput() ? 'form-btn' : 'form-btn-enable' }
            onClick={ handleClick }
          >
            Entrar
          </button>

          <Link
            id="btn-new-user"
            to="/register"
            data-testid="no-account-btn"
            className="form-btn-link"
          >
            Ainda não tenho conta
          </Link>
          {loginException}
        </div>
      </div>
    </div>
  );
}
