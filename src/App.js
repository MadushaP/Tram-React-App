import React, { Component } from 'react';
import './App.css';
import AppBar from './AppBar';
import SearchBar from './SearchBar';


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
