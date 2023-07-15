import React from 'react';
import Navigation from './Navigation';
import './Navigation.css';
import logo from './logo.png';
import SocialIcons from './SocialIcons';

const NavigationPanel = () => (
  <aside id="navigation-panel">
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
    <Navigation />
    <footer>
      <SocialIcons />
      <p>&copy; 2023 - CARBOOKER</p>
      <br />
    </footer>
  </aside>
);

export default NavigationPanel;
