import { useEffect, useState } from 'react';
import '../Styles/signup.css';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { createUser } from '../Redux/userSlice';
import appLogo from './Navigation/logo.png';

const SignUp = ({ authenticateUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { currentUser, error } = useSelector((state) => state.users);
  const [isUserExist, setIsUserExist] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setIsUserExist(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ user: formData }));
  };
  useEffect(() => {
    if (currentUser !== null) {
      authenticateUser(true);
      localStorage.setItem('authenticated', true);
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
      <div className="signup-cont">
        <div className="signup-header">
          <img id="logo" src={appLogo} alt="app logo" />
          <h1>Register</h1>
        </div>
        {isUserExist && <p>User is Already Exist!</p>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
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
          <button type="submit">Sign Up</button>
        </form>
        <div className="footer">
          <span>Are you a member already?</span>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>

  );
};

SignUp.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
};

export default SignUp;
