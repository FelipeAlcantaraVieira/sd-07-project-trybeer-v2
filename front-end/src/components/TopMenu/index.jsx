import React, { useState, useEffect } from 'react';
import SideBar from '../SideBar';

export default function TopMenu(props) {
  const [stateProps, setStateProps] = useState(props);
  const [showSideBar, setShowSideBar] = useState(false);

  const { topTitle } = stateProps;

  useEffect(() => {
    setStateProps(props);
  }, [props]);

  return (
    <div>
      <button
        type="button"
        data-testid="top-hamburguer"
        onClick={ () => setShowSideBar(!showSideBar) }
      >
        <img alt="hambeuger menu" src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png" />
      </button>
      <h2
        data-testid="top-title"
      >
        { topTitle || 'TryBeer' }
      </h2>
      {showSideBar ? <SideBar /> : <div />}
    </div>
  );
}
