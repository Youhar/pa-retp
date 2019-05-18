import React from 'react'
import ReactMapGL from 'react-map-gl'
import Measure from 'react-measure'
import styled from 'styled-components'
import { electricGrid } from '../services/energydata/client.js'
import { OptionsPanel } from './components/OptionsPanel.jsx'
import { ElectricMap } from './ElectricMap.jsx'

// TODO: Move to context
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const colorScale = r => [r * 255, 255 * (1 - r), 255 * (r - 0.5) * (r - 0.5)]

const Tooltip = styled.div`
    position: absolute;
    padding: 4px;
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    max-width: 300px;
    font-size: 10px;
    z-index: 9;
    pointer-events: none;
`

class ElectricGrid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewport: {
                ...ElectricMap.defaultViewState
            },
            data: undefined
        }
    }

    componentDidMount = async () => {
        try {
            const data = await electricGrid()
            this.setState({ data })
        } catch (e) {
            console.error(e)
        }
    }

    resize = dimensions => {
        this.onViewportChange({
            width: dimensions.width,
            height: dimensions.height
        })
    }

    onViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport },
            hoverInfo: null
        })
    }

    onHover = hoverInfo => {
        if (hoverInfo !== this.state.hoverInfo) {
            if (hoverInfo.object) {
                this.setState({ hoverInfo })
            } else {
                this.setState({ hoverInfo: undefined })
            }
        }
    }

    render() {
        const { viewport, data, hoverInfo } = this.state
        return (
            <Measure
                bounds
                onResize={contentRect => {
                    this.resize(contentRect.bounds)
                }}
            >
                {({ measureRef }) => (
                    <div
                        ref={measureRef}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <ReactMapGL
                            {...viewport}
                            onViewportChange={this.onViewportChange}
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                        >
                            <ElectricMap
                                data={data}
                                colorScale={colorScale}
                                onHover={this.onHover}
                            />
                            {hoverInfo && (
                                <Tooltip
                                    style={{
                                        left: hoverInfo.x,
                                        top: hoverInfo.y
                                    }}
                                >
                                    <b>
                                        {' '}
                                        {hoverInfo.object.properties.name !==
                                            undefined &&
                                            hoverInfo.object.properties
                                                .name}{' '}
                                    </b>
                                    <p>
                                        {' '}
                                        {hoverInfo.object.properties
                                            .nodeType !== undefined &&
                                            hoverInfo.object.properties
                                                .nodeType}{' '}
                                    </p>
                                    <b>
                                        {' '}
                                        {hoverInfo.object.properties
                                            .transmissionPower !== undefined &&
                                            hoverInfo.object.properties
                                                .transmissionPower +
                                                'kV ' +
                                                hoverInfo.object.properties
                                                    .lineType +
                                                ' line'}{' '}
                                    </b>
                                    <p>
                                        {' '}
                                        {hoverInfo.object.properties.nodes !==
                                            undefined &&
                                            'Between ' +
                                                hoverInfo.object.properties.nodes.join(
                                                    ' & '
                                                )}{' '}
                                    </p>
                                </Tooltip>
                            )}
                            <OptionsPanel />
                        </ReactMapGL>
                    </div>
                )}
            </Measure>
        )
    }
}

export { ElectricGrid }
