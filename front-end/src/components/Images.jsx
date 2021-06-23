import React from 'react';
import PropTypes from 'prop-types';

export default function Images({ value, index }) {
  return (
    <img
      className="image"
      data-testid={ `${index}-product-img` }
      src={ value }
      alt="Images Trybeer"
    />
  );
}

Images.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
