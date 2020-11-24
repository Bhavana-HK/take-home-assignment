import React from "react";
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../services';

export default function Header(props) {
  const history = useHistory();
  const classes = useStyles();

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
    <div className={classes.root}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" className={classes.h6}>Dashboard</Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={handleLogout}
            className={classes.button} >
            <Typography variant="subtitle2">logout
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  h6: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
    fontWeight: 'bold',
  },
  button: {
    marginRight: theme.spacing(2),
  }
}));