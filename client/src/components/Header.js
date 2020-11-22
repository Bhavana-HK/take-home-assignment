import React from "react";
import {  useHistory } from "react-router-dom";
import { logout } from '../services';

export default function Header(props) {
  const history = useHistory();

  const handleLogout = () => {
    logout()
      .then(() => {
        history.push('/');
      })
      .catch(err => {
        props.setError(err.message);
        props.setTimeout(() => props.setError(null), 3000);
      })
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}