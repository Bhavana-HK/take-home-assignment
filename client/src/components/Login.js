import React, { useState } from "react";
import { Link as LinkComponent, Button, Typography, TextField, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
        history.push('/dashboard')
      })
      .catch(err => {
        setError(err.message);
        setTimeout(() => setError(null), 3000)
      });
  };

  if (getUser())
    return <Redirect to={{ pathname: "/dashboard" }} />

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center">
        <Grid item xs={10} md={6}>
          <Paper elevation={0} className={classes.paper}>
            {error && <Alert type="error">{error}</Alert>}
            <Grid container direction="column">
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  style={{ fontWeight: 'bolder', textAlign: "center" }}>
                  {"Sign in"}
                </Typography>
              </Grid>
              <Grid item xs={12}>

                <form onSubmit={handleSubmit} className={classes.form}>
                  <label>Email</label>
                  <TextField
                    variant="outlined"
                    type="email"
                    required
                    value={email}
                    onChange={({ target }) => { setEmail(target.value) }} />

                  <label>Password</label>
                  <TextField
                    variant="outlined"
                    type="password"
                    required
                    value={password}
                    onChange={({ target }) => { setPassword(target.value) }} />

                  <div>
                    <Button variant="contained" color="primary" type="submit" fullWidth >
                      <Typography variant="subtitle2" style={{ padding: "10px", fontSize: "1rem" }}>{"Login"}</Typography>
                    </Button>
                  </div>
                </form>

              </Grid>
              <Grid item xs={12}>
                <LinkComponent component={Link} to="/signup" color="primary">
                  <Typography variant="subtitle2" style={{ textAlign: "center" }}>
                    {"Create an account"}
                  </Typography>
                </LinkComponent>
              </Grid>

            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  paper: {
    borderRadius: 10,
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
  },
  form: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
    textTransform: 'uppercase',
    '& > *': {
      padding: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        padding: theme.spacing(1),
      },
      width: '100%',
    },
    '& > label': {
      fontWeight: 900,
    },
  },
}));
