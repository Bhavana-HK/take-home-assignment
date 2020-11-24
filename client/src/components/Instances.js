import React from 'react';
import {
  Grid, Paper, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Link
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
const tableHeader = ['ID', 'Instance Name', 'Cost Per Hour', 'Status', 'Action'];
const tableContent = ['id', 'name', 'cost']

export default function Instances(props) {
  const classes = useStyles();
  const { instances = [], changeStatus } = props;

  return (
    <Paper className={classes.paper} elevation={0}>
      <Grid container >
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.h6}>Instances</Typography>
        </Grid>
        <TableContainer component={Paper} elevation={0} className={classes.table}>
          <Table aria-label="instance table">
            <TableHead>
              <TableRow>
                {tableHeader.map(header => (
                  <StyledTableCell key={header}>{header}</StyledTableCell>)
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {instances.map(instance => {
                const newStatus = instance.status === 'stopped' ? 'start' : 'stop';
                return (
                  <StyledTableRow key={instance.id}>
                    {tableContent.map(content => (
                      <StyledTableCell key={content}>{instance[content]}</StyledTableCell>
                    ))}
                    <StyledTableCell key='status'>
                      <Typography color={newStatus == 'stop' ? 'primary' : 'secondary'}
                        style={{ fontSize: 14 }}>
                        {instance.status}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell key="action">
                      <Link
                        onClick={() => changeStatus(newStatus, instance.id)}
                        underline="always"
                        color={newStatus == 'stop' ? 'secondary' : 'primary'}>
                        {newStatus}
                      </Link>
                    </StyledTableCell>
                  </StyledTableRow >
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Paper>
  );
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#acc7c7',
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
    align: 'center',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#e9f0f0',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#f0ede9',
    },
    borderBottom: '#ffff solid'
  },
}))(TableRow);

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
    marginBottom: theme.spacing(2),
  },
  table: {
    borderRadius: '10px'
  },
}));