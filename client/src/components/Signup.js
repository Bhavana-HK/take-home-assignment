import React, {useState} from "react";
import { Link as LinkComponent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useHistory } from "react-router-dom";
import { register } from '../services';
import Alert from './Alert';

export default function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    register({ email, password })
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
      {error && <Alert type="error">{error}</Alert> }
      <div>
        Sign up
      <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input type="email" required value={email} onChange={({ target }) => { setEmail(target.value) }} />
          <label>Password</label>
          <input ype="password" required value={password} onChange={({ target }) => { setPassword(target.value) }} />
          <button type="submit" >Create an account</button>
        </form>
        <Link to="/login"> Have an account already ? Login here</Link>
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
