import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchBar from "./SearchBar";
import Canvas from "./Canvas";

class Main extends React.Component {    
    render() {
        return <main>
            <Switch>
                <Route exact path='/' component={SearchBar} />
                <Route path='/Canvas' component={Canvas} />
            </Switch>
        </main>
    }
}

export default Main
