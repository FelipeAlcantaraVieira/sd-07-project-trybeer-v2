import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './TopMenu/style.css';

function SideBar(props) {
  const history = useHistory();
  const [stateProps, setStateProps] = useState(props);
  const [showSideBar, setShowSideBar] = useState(false);
  const { topTitle } = stateProps;
  
  useEffect(() => {
    setStateProps(props);
  }, [props]);

  return (
    <div className='top-menu'>
      <div className='top-menu-container'>
        <button
          type='button'
          className='menu'
          data-testid='top-hamburguer'
          onClick={() => setShowSideBar(!showSideBar)}>
          <img
            alt='hambeuger menu'
            src='https://img.icons8.com/ios-filled/50/000000/menu--v1.png'
          />
        </button>
        <div className='title-and-buttons'>
          <h1 data-testid='top-title'>{topTitle || 'TryBebos'}</h1>
        </div>
      </div>
      {showSideBar && (
        <aside className='side-menu-container'>
          <button
            type='button'
            data-testid='side-menu-item-orders'
            onClick={() => history.push('/admin/orders')}>
            Pedidos
          </button>
          <button
            type='button'
            data-testid='side-menu-item-profile'
            onClick={() => history.push('/admin/profile')}>
            Perfil
          </button>
          <button
            type='button'
            data-testid='side-menu-item-chat'
            onClick={() => history.push('/admin/chats')}>
            Conversas
          </button>
          <button
            type='button'
            data-testid='side-menu-item-logout'
            onClick={() => history.push('/login')}>
            Sair
          </button>
        </aside>
      )}
    </div>
  );
}

export default SideBar;
