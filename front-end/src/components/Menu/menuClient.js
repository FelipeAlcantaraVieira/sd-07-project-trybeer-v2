import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StyledMenu, Button } from './styles';

function MenuClient({ open }) {
  const history = useHistory();

  return (
    <div hidden={ !open }>
      <StyledMenu open={ open } className="side-menu-container">

        <Button
          name="btn-products"
          onClick={ () => history.push('/products') }
          data-testid="side-menu-item-products"
        >
          Produtos
        </Button>
        <Button
          name="btn-profile"
          onClick={ () => history.push('/orders') }
          data-testid="side-menu-item-my-orders"
        >
          Meus Pedidos
        </Button>
        <Button
          name="btn-myRequests"
          onClick={ () => history.push('/profile') }
          data-testid="side-menu-item-my-profile"
        >
          Meu Perfil
        </Button>
        <Button
          name="btn-chat"
          onClick={ () => history.push('/chat') }
          data-testid="side-menu-chat"
        >
          Conversar com a loja
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
    </div>
  );
}

export default MenuClient;

MenuClient.propTypes = {
  open: PropTypes.bool.isRequired,
};
