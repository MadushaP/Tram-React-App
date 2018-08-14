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
    marginLeft: '25%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 70,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(stationName, line, destination, arrivalTime) {
  id += 1;
  return { id, stationName, line , destination, arrivalTime };
}

function extractArrivalTime(selectedStation) {
  var arrivalTime = [selectedStation.Wait0, selectedStation.Wait1, selectedStation.Wait2]
  var arrivals = []

  arrivalTime.map(time => {
    if(time != "") {
      arrivals.push(createData(selectedStation.StationLocation, selectedStation.Line, selectedStation.Dest0, time))
    }
  })
  return arrivals;
}

function CustomizedTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Station</CustomTableCell>    
            <CustomTableCell>Line</CustomTableCell>
            <CustomTableCell>Destination</CustomTableCell>
            <CustomTableCell>Arrival time</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>          
          {extractArrivalTime(props.selectedSuggestion).map(station => {
            return (
              <TableRow className={classes.row} key={station.id}>
                <CustomTableCell component="th" scope="row"> {station.stationName} </CustomTableCell>
                <CustomTableCell component="th" scope="row"> {station.line} </CustomTableCell>
                <CustomTableCell component="th" scope="row"> {station.destination} </CustomTableCell>
                <CustomTableCell > In {station.arrivalTime} minutes.</CustomTableCell>
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
