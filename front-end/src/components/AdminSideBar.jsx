import React from 'react';
import { useHistory } from 'react-router-dom';

function SideBar() {
  const history = useHistory();
  return (
    <aside className="admin-side-bar-container">
      <button
        type="button"
        data-testid="side-menu-item-orders"
        onClick={ () => history.push('/admin/orders') }
      >
        Pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-profile"
        onClick={ () => history.push('/admin/profile') }
      >
        Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        onClick={ () => history.push('/login') }
      >
        Sair
      </button>
    </aside>
  );
}

export default SideBar;
