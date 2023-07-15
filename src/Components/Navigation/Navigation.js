import React from 'react';
import { useLocation } from 'react-router-dom';
import NavLink from './NavLink';

const Navigation = () => {
  const location = useLocation();

  const isActiveRoute = (route) => location.pathname === route;
  return (
    <nav className="NavigationPanel">
      <ul>
        <NavLink
          isActive={isActiveRoute}
          routePath="/"
          routeName="MODELS"
        />
        <NavLink
          isActive={isActiveRoute}
          routePath="/bookride"
          routeName="RESERVE CAR"
        />
        <NavLink
          isActive={isActiveRoute}
          routePath="/additem"
          routeName="ADD CAR"
        />
        <NavLink
          isActive={isActiveRoute}
          routePath="/myreservations"
          routeName="MY RESERVE"
        />
        <NavLink
          isActive={isActiveRoute}
          routePath="/deleteitem"
          routeName="DELETE CAR"
        />
      </ul>
    </nav>
  );
};

export default Navigation;
