import React from "react";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Home from './components/views/home';
//TODO
//import Networks from './views/networks';
//import Indicators from './views/indicators';

require('./stylesheets/main.scss');

const App = () => (
    <div>
        <Main />
    </div>
);

//TODO
const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
            </ul>
        </nav>
    </header>
);

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
        </Switch>
    </main>
);

ReactDOM.render(
    <Router>
        <App />
    </Router>
    , document.getElementById('canvas').appendChild(document.createElement('div'))
);