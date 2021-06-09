import React, { useState, useContext } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
import { nameIsValid } from '../../service/validateInputs';
import { TopMenu } from '../../components';
import { updateClient } from '../../service/trybeerApi';

export default function ProfileClient() {
  const { userLogged, setUserLogged } = useContext(TrybeerContext);
  const [text, setText] = useState();
  const [profileInfo, setProfileInfo] = useState({
    name: userLogged.name,
    email: userLogged.email,
  });

  const verifyInput = () => {
    const { name } = profileInfo;
    return name !== userLogged.name && nameIsValid(name);
  };

  const handleChange = ({ target: { name, value } }) => {
    setProfileInfo({
      ...profileInfo,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const TWO_THOUSAND = 2000;
    const newData = {
      ...userLogged,
      name: profileInfo.name,
    };
    const result = await updateClient(newData.name, newData.email);
    if (result.error) {
      setText(result.error);
      return setTimeout(() => {
        setText();
      }, TWO_THOUSAND);
    }
    setUserLogged(newData);
    setText(result.message);

    setTimeout(() => {
      setText();
    }, TWO_THOUSAND);
  };

  return (
    <div>
      <TopMenu topTitle="Meu perfil" />
      <label htmlFor="name">
        Nome:
        <input
          id="name"
          name="name"
          type="text"
          value={ profileInfo.name }
          onClick={ () => setProfileInfo({ ...profileInfo, name: '' }) }
          data-testid="profile-name-input"
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="email">
        Email:
        <input
          id="email"
          name="email"
          type="text"
          value={ profileInfo.email }
          readOnly
          data-testid="profile-email-input"
        />
      </label>
      <button
        type="button"
        data-testid="profile-save-btn"
        disabled={ !verifyInput() }
        onClick={ handleClick }
      >
        Salvar
      </button>
      { text }
    </div>
  );
}
