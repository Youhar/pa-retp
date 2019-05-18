import { Button, H1, H4 } from '@blueprintjs/core'
import React from 'react'

const backgroundPicture =
    'https://images.unsplash.com/photo-1458869612855-bb6009d50368'

class Home extends React.Component {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}
            >
                <img
                    src={backgroundPicture}
                    style={{
                        opacity: '0.8',
                        maxWidth: '100%',
                        maxHeight: '100%'
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        textAlign: 'center',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <H1>Pan Arab Regional Energy Trade Platform</H1>
                    <H4>A World Bank Group Initiative</H4>
                    <Button
                        icon="chevron-right"
                        large
                        intent="primary"
                        onClick={() => this.props.history.push('electric-grid')}
                        style={{ marginTop: '24px' }}
                    >
                        Enter
                    </Button>
                </div>
            </div>
        )
    }
}

export { Home }
