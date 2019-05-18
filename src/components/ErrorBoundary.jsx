import PropTypes from 'prop-types'
import React from 'react'
import { ExceptionPage } from './ExceptionPage'

class ErrorBoundary extends React.Component {
    state = {
        error: false
    }

    componentDidCatch(error, info) {
        this.setState({ error: true })
        console.log(error)
        console.log(info.componentStack)
    }

    render() {
        if (this.state.error) {
            const reload = <button onClick={this.handleReload}>Reload</button>
            return (
                <ExceptionPage
                    type={500}
                    title="Uh Oh..."
                    desc="Something went wrong, please reload the page"
                    actions={reload}
                />
            )
        }
        return this.props.children
    }

    handleReload = () => {
        window.location.reload()
        this.setState({ error: false })
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any
}

export { ErrorBoundary }
