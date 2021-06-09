import React from 'react';
import PropTypes from 'prop-types';

export default function Texts({ value, index }) {
  return (
    <p
      data-testid={ `${index}-product-name` }
    >
      { value }
    </p>
  );
}

Texts.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
