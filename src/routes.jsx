import { createBrowserHistory } from 'history'
import * as React from 'react'
import DocumentTitle from 'react-document-title'
import { Route, Router, Switch } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ExceptionPage } from './components/ExceptionPage'
import { Frame } from './Frame'

const history = createBrowserHistory()

const renderException = type => () => {
    return <ExceptionPage history={history} type={type} />
}

const Routes = () => {
    return (
        <ErrorBoundary>
            <DocumentTitle title="PA-RETP">
                <Router history={history}>
                    <Switch>
                        <Route path="/401" render={renderException(401)} />
                        <Route path="/403" render={renderException(403)} />
                        <Route path="/404" render={renderException(404)} />
                        <Route path="/500" render={renderException(500)} />
                        <Route path="/" component={Frame} />
                    </Switch>
                </Router>
            </DocumentTitle>
        </ErrorBoundary>
    )
}

export { Routes }
