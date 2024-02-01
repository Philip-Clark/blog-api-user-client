import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import { Link, Navigate, useNavigate } from 'react-router-dom';
const url = process.env.REACT_APP_SERVER_URL;

export default function Logout() {
  const { setAuthToken, authToken, setUserID, clearAuthCookies } = useContext(AuthContext);
  const navigate = useNavigate();

  setAuthToken('');
  setUserID('');
  clearAuthCookies();
  navigate('/');
}
