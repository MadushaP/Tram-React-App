import React, {Component} from 'react';
import './App.css';
import AppBar from './AppBar';
import SideBar from './SideBar';
import Main from './Main';

require("/Users/pallam01/IdeaProjects/Innovation/react-material/react-material/node_modules/@fortawesome/fontawesome-free/css/all.css");

class App extends Component {
    render() {
        return (
            <div>
                <AppBar variant="raised" color="primary"/>
                <SideBar/>
                <Main/>
            </div>
        );
    }
}


export default App;
