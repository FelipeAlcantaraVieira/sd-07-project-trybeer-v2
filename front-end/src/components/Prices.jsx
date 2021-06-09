import React from 'react';
import PropTypes from 'prop-types';

export default function Prices({ value, index }) {
  return (
    <p
      data-testid={ `${index}-product-price` }
    >
      R$
      {' '}
      { Number.parseFloat(value).toFixed(2).split('.').join(',') }
    </p>
  );
}

Prices.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
