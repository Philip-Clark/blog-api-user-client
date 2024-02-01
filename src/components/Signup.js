import './styles/login.css';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';
const url = process.env.REACT_APP_SERVER_URL;

export default function Signup() {
  const { setAuthToken, authToken, userID, setUserID } = useContext(AuthContext);
  const [formErrors, setFormErrors] = React.useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');
    const userName = data.get('username');

    axios
      .post(`${url}/api/users`, { email, password, userName })
      .then((res) => {
        console.log(res);
        axios.post(`${url}/login`, { email, password }).then((res) => {
          setAuthToken(res.data.token);
          setUserID(res.data.userID);
          if (location.state?.from && location.state.from === '/login') return navigate('/');
          navigate(-1);
        });
      })
      .catch((err) => {
        console.log(err);
        setFormErrors(err.response.data.errors);
      });
  };

  const handleLogin = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  const errorDisplay = (name) => {
    return (
      <p className="error">
        {formErrors.filter((error) => error.path === name).map((error) => error.msg + ' ')}
      </p>
    );
  };

  return (
    <div className="login">
      <h2>Sign Up</h2>
      <form className="loginForm" action="" method="post" onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email Address" />
        {errorDisplay('email')}
        <input type="username" name="username" placeholder="UserName" />
        {errorDisplay('userName')}
        <input type="password" name="password" placeholder="Password" />
        {errorDisplay('password')}
        <button type="submit">Sign Up</button>
        <p className="or">or</p>
        <button type="submit" className="minor" onClick={handleLogin}>
          Log In
        </button>
      </form>
    </div>
  );
}
