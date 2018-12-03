import React, {Component} from 'react';
import './App.css';
import AppBar from './AppBar';
import SearchBar from './SearchBar';
import SideBar from './SideBar'
require("/Users/pallam01/IdeaProjects/Innovation/react-material/react-material/node_modules/@fortawesome/fontawesome-free/css/all.css");

class App extends Component {
    render() {
        return (
            <div>
                <AppBar variant="raised" color="primary"/>
                <SearchBar/>
                <SideBar/>
            </div>
        );
    }
}

export default App;
