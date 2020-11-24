import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { INR_SYMBOL, INR_USD_RATE } from '../constants';
import CustomSwitch from './Switch';

export default function Summary(props) {
  const classes = useStyles();
  const { instances = [], currency = 'USD', setCurrency } = props;
  const runningCost = instances.reduce((prev, curr) => {
    if (curr.status === 'running')
      return prev + curr.costPerHour;
    return prev;
  }, 0);
  const stoppedCost = instances.reduce((prev, curr) => {
    if (curr.status === 'stopped')
      return prev + curr.costPerHour
    return prev;
  }, 0);


  const summaryInfo =
    currency === 'INR'
      ? {
        symbol: INR_SYMBOL,
        runningCost: runningCost / INR_USD_RATE,
        stoppedCost: stoppedCost / INR_USD_RATE,
      }
      : {
        symbol: '$',
        runningCost: runningCost,
        stoppedCost: stoppedCost,
      };

  const handleChange = () => {
    const newCurrency = currency === 'INR' ? 'USD' : 'INR';
    setCurrency(newCurrency);
  }

  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container >
        <SummaryTable
          symbol={summaryInfo.symbol}
          runningCost={summaryInfo.runningCost}
          stoppedCost={summaryInfo.stoppedCost}
        />
        <div style={{ flex: 1 }} />
        <div className={classes.switch}>
          <Grid container alignItems="center" justify="center">
          <Typography variant="h6" className={classes.h6}>INR</Typography>
          <CustomSwitch
            checked={currency === 'USD' ? true : false}
            onChange={handleChange}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <Typography variant="h6" className={classes.h6}>USD</Typography>
          </Grid>
        </div>
      </Grid>
    </Paper>
  );

}

function SummaryTable({ symbol, runningCost, stoppedCost }) {
  const classes = useStyles();
  return <table >
    <tbody>
      <tr>
        <td>
          <Typography variant="h6" className={classes.h6}>
            {symbol}
            <span> {runningCost.toFixed(2)}</span> / hr
          </Typography>
        </td>
        <td className={classes.left}>
          <Typography variant="h6" className={classes.h6}>
            {symbol}
            <span> {stoppedCost.toFixed(2)}</span> / hr
          </Typography>
        </td>
      </tr>
      <tr>
        <td><Typography variant="subtitle2">Running Instances</Typography></td>
        <td className={classes.left}>
          <Typography variant="subtitle2">
            Stopped Instances
          </Typography>
        </td>
      </tr>
    </tbody>
  </table>
}

const useStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 10,
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(1),
    },
    paddingLeft: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(2),
    },
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2),
    },
    border: '#a0a4b0 solid 1px',
    display: 'flex',
  },
  h6: {
    fontWeight: 900,
  },
  left: {
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  switch:{
    display: 'flex',
  }
}));

