import React from 'react';
import PropTypes from 'prop-types';

export default function Prices({ value, index }) {
  return (
    <h2 className="product-price" data-testid={ `${index}-product-price` }>
      R$
      {' '}
      {Number.parseFloat(value).toFixed(2).split('.').join(',')}
    </h2>
  );
}

Prices.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
