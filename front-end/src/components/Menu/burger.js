import React from 'react';
import PropTypes from 'prop-types';
import { StyledBurger } from './styles';

const Burger = ({ open, setOpen }) => (
  <StyledBurger
    open={ open }
    onClick={ () => setOpen(!open) }
    data-testid="top-hamburguer"
  >
    <div />
    <div />
    <div />
  </StyledBurger>
);

export default Burger;

Burger.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
