import React from 'react';
import PropTypes from 'prop-types';
import MenuBurger from '../Menu/index';

export default function Header({ title }) {
  return (
    <header>
      <MenuBurger data-testid="top-hamburguer" />
      <h1 data-testid="top-title">
        { title }
      </h1>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
