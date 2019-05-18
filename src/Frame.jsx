import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ElectricGrid } from './electric-grid/ElectricGrid'

//TODO
//import Gas grid map from './gas-grid'
//import Indicators from './indicators'
//import Project from './project' (about, events, partners...)

class Frame extends React.Component {
    render() {
        return (
            <div style={{ height: '100vh', padding: '24px' }}>
                {/* <Menu/> */}
                <Switch>
                    <Route exact={true} path="/" component={ElectricGrid} />
                    <Redirect to="/" />
                </Switch>
                {/* <Footer/> */}
            </div>
        )
    }
}

export { Frame }
