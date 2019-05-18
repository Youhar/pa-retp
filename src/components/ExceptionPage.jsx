import { Button, NonIdealState } from '@blueprintjs/core'
import PropTypes from 'prop-types'
import * as React from 'react'

const message = type => {
    switch (type) {
        case 401:
            return {
                desc: "Unauthorized. Looks like you can't do that.",
                title: '401',
                icon: 'shield'
            }
        case 403:
            return {
                desc:
                    'Your account has been deactivated. Please contact support.',
                title: '403',
                icon: 'outdated'
            }
        case 404:
            return {
                desc: 'Uh oh...looks like you got lost.',
                title: '404',
                icon: 'zoom-out'
            }
        case 500:
            return {
                desc: 'Something failed on our side. Please try again later.',
                title: '500',
                icon: 'error'
            }
        default:
            return {
                desc: 'Something failed on our side. Please try again later.',
                title: '500',
                icon: 'error'
            }
    }
}

const Actions = (type, history) => {
    switch (type) {
        case 401:
            return (
                <Button icon="home" large onClick={() => history.push('/')}>
                    Home
                </Button>
            )
        case 403:
            return (
                <Button
                    icon="envelope"
                    large
                    onClick={() => history.push('/contact')}
                >
                    Contact Support
                </Button>
            )
        case 404:
            return (
                <Button icon="undo" large onClick={() => history.goBack()}>
                    Go back
                </Button>
            )
        case 500:
            return (
                <Button icon="home" large onClick={() => history.push('/')}>
                    Home
                </Button>
            )
        default:
            return (
                <Button icon="home" large onClick={() => history.push('/')}>
                    Home
                </Button>
            )
    }
}

const ExceptionPage = props => {
    const defaultMessage = message(props.type)
    const icon = props.icon ? props.icon : defaultMessage.icon
    const title = props.title ? props.title : defaultMessage.title
    const desc = props.desc ? props.desc : defaultMessage.desc
    const actions = props.actions
        ? props.actions
        : Actions(props.type, props.history)
    return (
        <div
            className="bp3-dark bp3-card bp3-elevation-2 .modifier"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100vh'
            }}
        >
            <NonIdealState
                icon={icon}
                title={title}
                description={desc}
                action={actions}
            />
        </div>
    )
}

ExceptionPage.propTypes = {
    history: PropTypes.any,
    actions: PropTypes.node,
    title: PropTypes.string,
    desc: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.oneOf([401, 403, 404, 500])
}

export { ExceptionPage }
