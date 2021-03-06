import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import GoogleMap from './Map.js'

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
    }
});

let id = 0;

function createData(stationName, line, destination, arrivalTime, direction) {
    id += 1;
    return {id, stationName, line, destination, arrivalTime, direction};
}

function removeDuplicates(originalArray, objKey) {
    var trimmedArray = [];
    var values = [];
    var value;

    for (var i = 0; i < originalArray.length; i++) {
        value = originalArray[i][objKey];

        if (values.indexOf(value) === -1) {
            trimmedArray.push(originalArray[i]);
            values.push(value);
        }
    }
    return trimmedArray;
}

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function sortArrivalTime(dataWithRemovedDuplication) {
    return dataWithRemovedDuplication.sort(function (a, b) {
        return compareStrings(a.arrivalTime, b.arrivalTime);
    });
}

function cleanseData(arrivalsWithExtracted) {
    var cleanArrivals = []

    arrivalsWithExtracted.forEach(element => {
        if (element.destination.length || element.arrivalTime.length > 1)
            cleanArrivals.push(element)
    });
    var dataWithRemovedDuplication = removeDuplicates(cleanArrivals, "arrivalTime");
    var sortedDestinations = sortArrivalTime(dataWithRemovedDuplication)

    return sortedDestinations;
}

function extractArrival(selectedStation) {
    var arrivalsWithExtractedTimes = []

    selectedStation.map(station => {
        arrivalsWithExtractedTimes.push(
            createData(station.StationLocation, station.Line, station.Dest0, station.Wait0, station.Direction),
            createData(station.StationLocation, station.Line, station.Dest0, station.Wait1, station.Direction),
            createData(station.StationLocation, station.Line, station.Dest0, station.Wait2, station.Direction))
    })

    return cleanseData(arrivalsWithExtractedTimes);
}

function formatArrivalTime(arrivalTime) {
    if (arrivalTime == 0)
        return "Due now"
    else
        return arrivalTime + " minutes";
}

function CustomizedTable(props) {
    const {classes} = props;
    return (
        <div>
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell>Destination</CustomTableCell>
                            <CustomTableCell>Line</CustomTableCell>
                            <CustomTableCell>Direction</CustomTableCell>
                            <CustomTableCell>Arrival time</CustomTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {extractArrival(props.selectedSuggestion).map(station => {
                            return (
                                <TableRow className={classes.row} key={station.id}>
                                    <CustomTableCell component="th"
                                                     scope="row"> {station.destination} </CustomTableCell>
                                    <CustomTableCell component="th" scope="row"> {station.line} </CustomTableCell>
                                    <CustomTableCell component="th" scope="row"> {station.direction} </CustomTableCell>
                                    <CustomTableCell>{formatArrivalTime(station.arrivalTime)}</CustomTableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
            <GoogleMap selectedSuggestion={props.selectedSuggestion[0]}></GoogleMap>
        </div>

    );
}

CustomizedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
