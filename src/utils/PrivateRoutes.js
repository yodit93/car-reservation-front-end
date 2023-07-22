import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoutes = ({ authenticateUser }) => (
  <>
    {authenticateUser ? <Outlet /> : <Navigate to="/login" />}
  </>
);
PrivateRoutes.propTypes = {
  authenticateUser: PropTypes.bool.isRequired,
};
export default PrivateRoutes;
