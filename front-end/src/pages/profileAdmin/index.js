import React, { useState, useContext } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
import AdminSideBar from '../../components/AdminSideBar';
import './styles.css';

export default function ProfileAdmin() {
  const { userLogged } = useContext(TrybeerContext);
  const [profileInfo] = useState({
    name: userLogged.name,
    email: userLogged.email,
  });

  return (
    <div className="admin-profile-container">
      <AdminSideBar topTitle="Meu Perfil" />
      <div className="admin-profile-info">
        <div className="profile-container">
          <h3 data-testid="profile-name">{`Usuário: ${profileInfo.name}`}</h3>
          <h3 data-testid="profile-email">{`E-mail: ${profileInfo.email}`}</h3>
        </div>
      </div>
    </div>
  );
}
