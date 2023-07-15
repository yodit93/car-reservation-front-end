import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLink = (props) => {
  const { isActive, routePath, routeName } = props;
  return (
    <li className={isActive(routePath) ? 'active' : ''}>
      <Link to={routePath}>{routeName}</Link>
    </li>
  );
};

NavLink.propTypes = {
  isActive: PropTypes.func.isRequired,
  routePath: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};

export default NavLink;
