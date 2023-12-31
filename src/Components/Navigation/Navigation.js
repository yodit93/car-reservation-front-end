import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiLogOut } from 'react-icons/fi';
import NavLink from './NavLink';
import { signOutUser } from '../../Redux/userSlice';

const Navigation = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

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
      <div className="logout-cont">
        <button type="button" className="logout" onClick={handleSignOut}>
          Log out
          <span className="logout-icon"><FiLogOut /></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
