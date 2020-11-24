import React, { useState } from "react";
import { Link as LinkComponent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Link, useHistory, Redirect } from "react-router-dom";
import Alert from './Alert';
import { login, getUser } from '../services';

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

  if (getUser())
    return <Redirect to={{ pathname: "/dashboard" }} />

  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        {error && <Alert type="error">{error}</Alert>}
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
      </Paper>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {

  },
}));
