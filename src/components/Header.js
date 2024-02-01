import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/header.css';

export default function Header({ LoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/logout', { state: { from: location.pathname } });
  };
  const handleLogin = () => {
    navigate('/login', { state: { from: location.pathname } });
  };

  const handleSignup = () => {
    navigate('/signup', { state: { from: location.pathname } });
  };

  const actionButton = () => {
    if (LoggedIn) return <button onClick={handleLogout}>Logout</button>;
    if (location.pathname !== '/login') return <button onClick={handleLogin}>Login</button>;
    return <button onClick={handleSignup}>Sign Up</button>;
  };

  return (
    <div className="header">
      <Link to={'/'}>
        <h1> ✏️ Bloggy</h1>
      </Link>

      <div>{actionButton()}</div>
    </div>
  );
}

Header.propTypes = {
  LoggedIn: PropTypes.bool.isRequired,
};
