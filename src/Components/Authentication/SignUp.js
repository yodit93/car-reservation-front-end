import { useEffect, useState } from 'react';
import '../../Styles/signup.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearError, createUser } from '../../Redux/userSlice';
import appLogo from '../Navigation/logo.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { currentUser, error } = useSelector((state) => state.users);
  const [isUserExist, setIsUserExist] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleError = () => (dispatch(clearError()));
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
    setIsUserExist(false);
    handleError();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser({ user: formData }));
  };
  useEffect(() => {
    if (currentUser !== null) {
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
          <div className="logo-container">
            <img id="logo" src={appLogo} alt="app logo" />
          </div>
          <h1>Register</h1>
        </div>
        {isUserExist && <p className="error-message">User Already Exist!</p>}
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
          <button className="signup-btn" type="submit">SIGN UP</button>
        </form>
        <div className="footer">
          <span>Alredy have an account?</span>
          <Link to="/login" onClick={handleError}>LOGIN</Link>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
