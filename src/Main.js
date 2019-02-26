import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SearchBar from "./SearchBar";
import Canvas from "./Canvas";
import Particle from "./Particle";

class Main extends React.Component {    
    render() {
        return <main>
            <Switch>
                <Route exact path='/' component={SearchBar} />
                <Route path='/Canvas' component={Canvas} />
                <Route path='/Particle' component={Particle} />
            </Switch>
        </main>
    }
}

export default Main
