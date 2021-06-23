import React, { useState, useEffect } from 'react';
import SideBar from '../SideBar';
import './style.css';

export default function TopMenu(props) {
  const [stateProps, setStateProps] = useState(props);
  const [showSideBar, setShowSideBar] = useState(false);

  const { topTitle } = stateProps;

  useEffect(() => {
    setStateProps(props);
  }, [props]);

  return (
    <div className="top-menu">
      <div className="top-menu-container">
        <button
          type="button"
          className="menu"
          data-testid="top-hamburguer"
          onClick={ () => setShowSideBar(!showSideBar) }
        >
          <img
            alt="hambeuger menu"
            src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png"
          />
        </button>
        <div className="title-and-buttons">
          <h1 data-testid="top-title">{topTitle || 'TryBebos'}</h1>
        </div>
      </div>
      {showSideBar && <SideBar />}
    </div>
  );
}
