import React from 'react';
import Burger from './burger';
import MenuClient from './menuClient';
import MenuAdmin from './menuAdmin';

function MenuBurger() {
  const [open, setOpen] = React.useState(false);
  const node = React.useRef();

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const renderMenu = () => {
    if (currentUser) {
      if (currentUser.role === 'administrator') {
        return <MenuAdmin open={ open } setOpen={ setOpen } />;
      }

      return <MenuClient open={ open } setOpen={ setOpen } />;
    }
  };

  return (
    <div>
      <div ref={ node } className="side-menu-container">
        <Burger open={ open } setOpen={ setOpen } />
        { renderMenu() }
      </div>
    </div>
  );
}

export default MenuBurger;
