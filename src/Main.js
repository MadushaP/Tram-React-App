import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchBar from "./SearchBar";
import Tracker from "./Tracker";

class Main extends React.Component {    
    render() {
        return <main>
            <Switch>
                <Route exact path='/' component={SearchBar} />
                <Route path='/Tracker' component={Tracker} />
            </Switch>
        </main>
    }
}

export default Main
