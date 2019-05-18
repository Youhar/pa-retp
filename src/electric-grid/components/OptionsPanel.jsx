import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 284px;
    background: #fff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.15);
    margin: 24px;
    padding: 24px;
    z-index: 5;
    outline: none;

    .hr {
        margin: 12px -24px;
    }
    .h3 {
        font-size: 1.2em;
        font-weight: 500;
        margin: 8px 0;
    }

    .a {
        display: inline;
    }

    .p {
        margin-bottom: 16px;
    }
    .legend {
        display: inline-block;
        width: 12px;
        height: 12px;
    }
`

class OptionsPanel extends React.Component {
    render() {
        return (
            <Panel>
                <h3 className="text-center">MENA Electric Network</h3>
                <p>Main lines of the network and nodes</p>
                <p>Line width - Type of line (single, double, triple...)</p>
                <div>
                    <p>Line color - Transmission power of the line</p>
                    <div className="layout">
                        <div
                            className="legend"
                            style={{
                                width: '25%',
                                backgroundColor: 'rgb(100,202,74)'
                            }}
                        />
                        <div
                            className="legend"
                            style={{
                                width: '25%',
                                backgroundColor: 'rgb(132,186,71)'
                            }}
                        />
                        <div
                            className="legend"
                            style={{
                                width: '25%',
                                backgroundColor: 'rgb(200,124,69)'
                            }}
                        />
                        <div
                            className="legend"
                            style={{
                                width: '25%',
                                backgroundColor: 'rgb(234,84,78)'
                            }}
                        />
                    </div>
                    <div className="layout text-center">
                        <div style={{ width: '25%' }}>150kV</div>
                        <div style={{ width: '25%' }}>225kV</div>
                        <div style={{ width: '25%' }}>400kV</div>
                        <div style={{ width: '25%' }}>500kV</div>
                    </div>
                </div>
                <div>
                    <p>Node color - Type of node</p>
                    <div className="layout">
                        <div
                            className="legend"
                            style={{
                                width: '25%',
                                backgroundColor: 'rgb(255, 153, 51)'
                            }}
                        />
                        <div
                            className="legend"
                            style={{
                                width: '25%',
                                backgroundColor: 'rgb(102, 102, 255)'
                            }}
                        />
                        <div
                            className="legend"
                            style={{
                                width: '25%',
                                backgroundColor: 'rgb(255, 102, 102)'
                            }}
                        />
                        <div
                            className="legend"
                            style={{
                                width: '25%',
                                backgroundColor: 'rgb(51, 153, 255)'
                            }}
                        />
                    </div>
                    <div className="layout text-center">
                        <div style={{ width: '25%' }}>City</div>
                        <div style={{ width: '25%' }}>Town</div>
                        <div style={{ width: '25%' }}>Plant</div>
                        <div style={{ width: '25%' }}>Dam</div>
                    </div>
                </div>
            </Panel>
        )
    }
}

export { OptionsPanel }
