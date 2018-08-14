import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Table from './Table.js';


var suggestions = [];

function renderInput(inputProps) {
    const { classes, ref, ...other } = inputProps;

    return (
        <Paper className={classes.card} elevation={4}>
            <TextField
                fullWidth
                InputProps
                ={{
                    inputRef: ref,
                    classes: {
                        input: classes.input,
                    },
                    ...other,
                }}
            />
        </Paper>
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.StationLocation, query);
    const parts = parse(suggestion.StationLocation, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) => {
                    return part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 300 }}>
                            {part.text}
                        </span>
                    ) : (
                            <strong key={String(index)} style={{ fontWeight: 500 }}>
                                {part.text}
                            </strong>
                        );
                })}
            </div>
        </MenuItem>
    );
}

function renderSuggestionsContainer(options) {
    const { containerProps, children } = options;

    return (
        <Paper {...containerProps} square>
            {children}
        </Paper>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.StationLocation;
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

function checkSubtring(suggestion, value) {
    return (suggestion.StationLocation.toLowerCase()).includes(value.toLowerCase());
}

function getSuggestions(value) {
    var filterSuggestions = []
    fetch('http://localhost:8080/tramstops')
        .then(response => response.json())
        .then(response => {
            suggestions = response.value
        }).then(function () {
            suggestions = suggestions.filter(((suggestion) => checkSubtring(suggestion, value)))
        })
    return removeDuplicates(suggestions, "station");
}

const styles = theme => ({
    container: {
        flexGrow: 1,
        position: 'relative',
        height: 50,
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
        marginLeft: 250,
        marginRight: 250,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    card: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        marginLeft: 350,
        marginRight: 350

    }),
});

class IntegrationAutosuggest extends React.Component {
    state = {
        value: '',
        suggestions: [],
        showResults: false
    };

    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    handleChange = (event, { newValue }) => {
        this.setState({
            value: newValue,
        });
    };

    onSuggestionSelected = (event, { suggestion }) => {
        this.setState({
            showResults: true,
            selectedSuggestion: suggestion
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Autosuggest
                    theme={{
                        container: classes.container,
                        suggestionsContainerOpen: classes.suggestionsContainerOpen,
                        suggestionsList: classes.suggestionsList,
                        suggestion: classes.suggestion,
                    }}
                    renderInputComponent={renderInput}
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                    renderSuggestionsContainer={renderSuggestionsContainer}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={{
                        classes,
                        placeholder: 'Search for a tramstop',
                        value: this.state.value,
                        onChange: this.handleChange,
                        type: 'search'
                    }}
                    onSuggestionSelected={this.onSuggestionSelected}
                />
                {this.state.showResults ? <Table selectedSuggestion={this.state.selectedSuggestion} /> : null}
            </div>

        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);
