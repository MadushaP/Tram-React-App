import React from 'react';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    map: {
        width: '67%',
        height: '450px',
    },
    space: {
        'padding-top': '30px',
        'marginLeft': '25%'
    }
});

var mediaCityMapUrl = ""
var piccadilyUrl = ""

fetch('http://localhost:8080/mapApi').then(response => response.text()).then(key => {
    mediaCityMapUrl = "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJs9oFOTepe0gRQxVZHolOKEg&key=[Key]".replace("[Key]", key)
    piccadilyUrl = "https://www.google.com/maps/embed/v1/place?q=place_id:ChIJwyA1or-xe0gRp7KMIqjUE0w&key=[Key]".replace("[Key]", key)
})

function stationToMapUrl(station) {
    if (station == null)
        return;
    switch (station.StationLocation) {
        case "MediaCityUK":
            return mediaCityMapUrl;
        case "Piccadilly Gardens":
            return piccadilyUrl;
        default:
            return ""
    }
}

function GoogleMap(props) {
    const {classes} = props;
    return (
        <div className={classes.space}>
            <iframe className={classes.map} src={stationToMapUrl(props.selectedSuggestion)}></iframe>
        </div>
    );
}

export default withStyles(styles)(GoogleMap);
