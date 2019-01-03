import React, { Component } from 'react';
import './App.css';
import AppBar from './AppBar';
import SideBar from './SideBar';
import Main from './Main';
import { withRouter } from 'react-router-dom';

require("/Users/pallam01/IdeaProjects/Innovation/react-material/react-material/node_modules/@fortawesome/fontawesome-free/css/all.css");

class App extends Component {
    state = {
        pageLocation: "Metro Tram App"
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged(this.props.location);
        }
    }

    onRouteChanged(location) {
        switch (location.pathname) {
            case "/":
                this.setState({ pageLocation: "Metro Tram App" })
                break;
            case "/Tracker":
                this.setState({ pageLocation: "Tracker" })
        }

    }

    render() {
        return (
            <div>
                <AppBar variant="raised" color="primary" pageLocation={this.state.pageLocation} />
                <SideBar />
                <Main />
            </div>
        );
    }
}


export default withRouter(App);
