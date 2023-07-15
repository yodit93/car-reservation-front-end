import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Navigation from './Navigation';
import SocialIcons from './SocialIcons';
import Logo from './Logo';
import './Navigation.css';

const NavigationPanel = () => {
  const [isActive, setIsActive] = useState(false);

  const ToggleMobileNav = () => (
    isActive ? setIsActive(false) : setIsActive(true)
  );

  return (
    <div>
      <header>
        <div className="mobile-nav-container">
          <Logo />
          <div className="nav-bars" onClick={ToggleMobileNav} onKeyDown={ToggleMobileNav} role="button" tabIndex={0} aria-label="open"><FaBars /></div>
        </div>
      </header>
      <aside id="navigation-panel" className={isActive ? 'active' : ''}>
        <div className="nav-close-btn">
          <button type="button" onClick={ToggleMobileNav}>X</button>
        </div>
        <Logo />
        <Navigation />
        <footer>
          <SocialIcons />
          <p>&copy; 2023 - CARBOOKER</p>
          <br />
        </footer>
      </aside>
      <div className={isActive ? 'overlay active' : 'overlay'} onClick={ToggleMobileNav} onKeyDown={ToggleMobileNav} role="button" tabIndex={0} aria-label="close" />
    </div>
  );
};

export default NavigationPanel;
