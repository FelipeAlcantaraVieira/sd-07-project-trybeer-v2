import React, { useState, useContext } from 'react';
import TrybeerContext from '../../context/TrybeerContext';
import AdminSideBar from '../../components/AdminSideBar';

export default function ProfileAdmin() {
  const { userLogged } = useContext(TrybeerContext);
  const [profileInfo] = useState({
    name: userLogged.name,
    email: userLogged.email,
  });

  return (
    <div>
      <AdminSideBar />
      <h1 data-testid="profile-title">Perfil</h1>
      <p data-testid="profile-name">{`Nome:${profileInfo.name}`}</p>
      <p data-testid="profile-email">{`Nome:${profileInfo.email}`}</p>
    </div>
  );
}
