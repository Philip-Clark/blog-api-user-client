import './styles/login.css';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { useNavigate, useLocation } from 'react-router-dom';
const url = process.env.REACT_APP_SERVER_URL;

export default function Login() {
  const { setAuthToken, authToken, userID, setUserID } = useContext(AuthContext);
  const [formError, setFormError] = React.useState();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');

    axios
      .post(`${url}/login`, { email, password })
      .then((res) => {
        console.log(res);
        setAuthToken(res.data.token);
        setUserID(res.data.userID);
        if (location.state?.from && location.state.from === '/signup') return navigate('/');
        navigate(-1);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setFormError(err.response.data.error);
      });
  };

  const handleSignUp = () => {
    navigate('/signup', { state: { from: location.pathname } });
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form className="loginForm" action="" method="post" onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email Address" />
        <input type="password" name="password" placeholder="Password" />
        {formError && <p className="error">{formError}</p>}
        <button type="submit">Login</button>
        <p className="or">or</p>
        <button type="submit" className="minor" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
}
