import React, { useState } from "react";
import { Link as LinkComponent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { login } from '../services';

export default function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ email, password })
      .then(() => {
        console.log("here")
        history.push('/dashboard')
      })
      .catch(err => {
        console.log("login error")
        setError(err.message);
        setTimeout(() => setError(null), 3000)
      });
  };

  return (
    <div>
      {error && (
        <p>{error}</p>
      )}
      <div>
        Sign in
      <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" required value={email} onChange={({ target }) => { setEmail(target.value) }} />
          <label>Password</label>
          <input type="password" required value={password} onChange={({ target }) => { setPassword(target.value) }} />
          <button type="submit" >Login</button>
        </form>
        <Link to="/signup">
          Create an account
      </Link>
      </div>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  main: {
    margin: "0 auto",
    padding: "16px"
  },
  menu: {
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#CCC",
    "& button": {
      margin: theme.spacing(1)
    }
  }
}));
