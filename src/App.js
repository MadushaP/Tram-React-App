import React, {Component} from 'react';
import './App.css';
import AppBar from './AppBar';
import SideBar from './SideBar';
import Main from './Main';
import {withRouter} from 'react-router-dom';

require("/Users/pallam01/IdeaProjects/Innovation/react-material/react-material/node_modules/@fortawesome/fontawesome-free/css/all.css");

class App extends Component {
    state = {
        pageLocation: ""
    }

    componentDidMount() {
        this.onRouteChanged(this.props.location);
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged(this.props.location);
        }
    }

    onRouteChanged(location) {
        switch (location.pathname) {
            case "/":
                this.setState({pageLocation: "Metro Tram App"})
                break;
            case "/Canvas":
                this.setState({pageLocation: "3D Babylon Canvas"})
                break;
            case "/Particle":
                this.setState({pageLocation: "3D Babylon Particle Engine"})
                break;
        }

    }

    render() {
        return (
            <div>
                <AppBar variant="raised" color="primary" pageLocation={this.state.pageLocation}/>
                <SideBar/>
                <Main/>
            </div>
        );
    }
}


export default withRouter(App);
