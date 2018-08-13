import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '50%',
    marginLeft: 420,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(destination, arrivalTime, fat, carbs, protein) {
  id += 1;
  return { id, destination, arrivalTime, fat, carbs, protein };
}

const data = [
  createData('Etihad Campus', "12.05"),
  createData('New Islington', "12.25"),
];

const data2 = [
  createData('Manchester Airport', "17.15"),
  createData('Deansgate', "18.00"),
]



function getMetroLinks() {
  fetch("https://api.tfgm.com/odata/Metrolinks?$top=10", {
    method: 'get',
    headers: new Headers({'Ocp-Apim-Subscription-Key':'a5d66354dc2642f681f9b24159f49999' }),
  })
  .then(res => { res.json()})
  .then(
    (result) => {
      console.log(result);
    },
    // Note: it's important to handle errors here
    // instead of a catch() block so that we don't swallow
    // exceptions from actual bugs in components.
    (error) => {
      console.log(error)
    }
  )
}

function getData(selectedStation) {
  getMetroLinks();

  if(selectedStation == "Media City")
    return data;
    else 
    return data2;
} 

function CustomizedTable(props) {
  console.log(props.selectedStation)

  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Destination</CustomTableCell>
            <CustomTableCell numeric>Arrival time</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
          {getData(props.selectedStation).map(n => {
            return (
              <TableRow className={classes.row} key={n.id}>
                <CustomTableCell component="th" scope="row">
                  {n.destination}
                </CustomTableCell>
                <CustomTableCell numeric>{n.arrivalTime}</CustomTableCell>
              </TableRow>
            );
          })}

        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
