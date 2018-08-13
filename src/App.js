import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import AppBar from './AppBar';
import SearchBar from './SearchBar';
import Table from './Table.js';


class App extends Component {
  render() {
    return (
       <div>
      <AppBar variant="raised"  color="primary"></AppBar>
      <SearchBar></SearchBar>
       </div>
    );

  }
}

export default App;
