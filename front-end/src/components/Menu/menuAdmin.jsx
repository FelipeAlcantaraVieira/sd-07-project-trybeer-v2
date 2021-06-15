import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, StyledMenu } from './styles';

function MenuAdmin({ open }) {
  const history = useHistory();

  return (
    <StyledMenu className="admin-side-bar-container" open={ !open }>
      <Button
        name="btn-requests"
        onClick={ () => history.push('/admin/orders') }
        data-testid="side-menu-item-orders"
      >
        Pedidos
      </Button>
      <Button
        name="btn-profile"
        onClick={ () => history.push('/admin/profile') }
        data-testid="side-menu-item-profile"
      >
        Perfil
      </Button>
      <Button
        name="btn-admin-chat"
        onClick={ () => history.push('/admin/chats') }
        data-testid="side-menu-item-chat"
      >
        Conversas
      </Button>
      <Button
        name="btn-exit"
        data-testid="side-menu-item-logout"
        onClick={ () => {
          history.push('/login');
          localStorage.clear();
        } }
      >
        Sair
      </Button>
    </StyledMenu>
  );
}

export default MenuAdmin;

MenuAdmin.propTypes = {
  open: PropTypes.bool.isRequired,
};
