import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ElectricGrid } from './electric-grid/ElectricGrid'
import { Home } from './home'

//TODO
//import Gas grid map from './gas-grid'
//import Indicators from './indicators'
//import Project from './project' (about, events, partners...)

class Frame extends React.Component {
    render() {
        return (
            <div
                className="bp3-dark"
                style={{
                    height: '100vh',
                    padding: '24px',
                    backgroundColor: '#30404d'
                }}
            >
                {/* <Menu/> */}
                <Switch>
                    <Route
                        exact={true}
                        path="/electric-grid"
                        component={ElectricGrid}
                    />
                    <Route exact={true} path="/" component={Home} />
                    <Redirect to="/" />
                </Switch>
                {/* <Footer/> */}
            </div>
        )
    }
}

export { Frame }
