import { useState, useEffect } from 'react';
import '../Styles/signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../Redux/userSlice';
import appLogo from './Navigation/logo.png';

const LogIn = ({ authenticateUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { currentUser, error } = useSelector((state) => state.users);
  const [isUserExist, setIsUserExist] = useState(false);
  console.log(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    setIsUserExist(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ user: formData }));
  };
  useEffect(() => {
    if (currentUser !== null) {
      authenticateUser(true);
      navigate('/');
    }
  }, [currentUser]);
  useEffect(() => {
    if (error !== null) {
      setIsUserExist(true);
    }
  }, [error]);
  return (
    <div className="outer-cont">
      <div className="login-cont">
        <div className="login-header">
          <img id="logo" src={appLogo} alt="app logo" />
          <h1>Log In</h1>
        </div>
        {isUserExist && <p>No user maches this information</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Log In</button>
        </form>
        <div className="footer">
          <span>Are you new?</span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};
LogIn.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
};
export default LogIn;
