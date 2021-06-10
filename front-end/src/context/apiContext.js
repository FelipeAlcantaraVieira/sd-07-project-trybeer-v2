import React, { useState } from 'react';
import Proptypes from 'prop-types';
import ApiContext from './context';

function ApiProvider({ children }) {
  const [data, setData] = useState(false);

  const userData = {
    data,
    setData,
  };

  return (
    <ApiContext.Provider value={ userData }>
      { children }
    </ApiContext.Provider>
  );
}

export default ApiProvider;

ApiProvider.propTypes = {
  children: Proptypes.node.isRequired,
};
