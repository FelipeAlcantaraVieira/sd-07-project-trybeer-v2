import React from 'react';
import PropTypes from 'prop-types';

export default function Texts({ value, index }) {
  return (
    <h2
      className="product-name"
      data-testid={ `${index}-product-name` }
    >
      { value }
    </h2>
  );
}

Texts.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
