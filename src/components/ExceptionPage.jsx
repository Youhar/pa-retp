import PropTypes from 'prop-types'
import * as React from 'react'

const message = type => {
    switch (type) {
        case 401:
            return {
                desc: "Unauthorized. Looks like you can't do that.",
                title: '401',
                type: '403'
            }
        case 403:
            return {
                desc:
                    'Your account has been deactivated. Please contact support.',
                title: '403',
                type: '403'
            }
        case 404:
            return {
                desc: 'Uh oh...looks like you got lost.',
                title: '404',
                type: '404'
            }
        case 500:
            return {
                desc: 'Something failed on our side. Please try again later.',
                title: '500',
                type: '500'
            }
    }
}

const Actions = type => {
    switch (type) {
        case 401:
            return (
                <button type="primary" href="/">
                    Home
                </button>
            )
        case 403:
            return (
                <button type="primary" href="https://bigblue.co/contact">
                    Contact Support
                </button>
            )
        case 404:
            return (
                <button type="primary" href="/">
                    Go back home
                </button>
            )
        case 500:
            return (
                <button type="primary" href="/">
                    Home
                </button>
            )
    }
}

const ExceptionPage = props => {
    const defaultMessage = message(props.type)
    const desc = props.desc ? props.desc : defaultMessage.desc
    const title = props.title ? props.title : defaultMessage.title
    const actions = props.actions ? props.actions : Actions(props.type)
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <h2>{title}</h2>
                <h4>{desc}</h4>
                {actions}
            </div>
        </div>
    )
}

ExceptionPage.propTypes = {
    actions: PropTypes.node,
    desc: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf([401, 403, 404, 500])
}

export { ExceptionPage }
