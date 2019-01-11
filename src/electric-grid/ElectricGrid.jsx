import axios from 'axios'
import React from 'react'
import MapGL from 'react-map-gl'
import styled from 'styled-components'
import { OptionsPanel } from './components/OptionsPanel.jsx'
import { ElectricMap } from './ElectricMap.jsx'

// TODO: Move to services/api & add an encompassing context with methods to get the data from
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
// Source data GeoJSON
const DATA_URL =
    'https://development-data-hub-s3-public.s3.amazonaws.com/ddhfiles/145365/electric-network-mena.geojson'

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
                ...ElectricMap.defaultViewport,
                width: 1200,
                height: 800
            },
            data: null
        }
        this._onHover = this._onHover.bind(this)
    }

    async componentDidMount() {
        try {
            const response = await axios.get(DATA_URL)
            this.setState({ data: response.data })
        } catch (e) {
            console.error(e)
        }
        window.addEventListener('resize', this._resize.bind(this))
        this._resize()
    }

    _resize() {
        this._onViewportChange({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    _onViewportChange(viewport) {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport },
            hoverInfo: null
        })
    }

    _onHover(hoverInfo) {
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
            <MapGL
                {...viewport}
                onViewportChange={this._onViewportChange.bind(this)}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            >
                <ElectricMap
                    viewport={viewport}
                    data={data}
                    colorScale={colorScale}
                    onHover={this._onHover}
                />
                {hoverInfo && (
                    <Tooltip style={{ left: hoverInfo.x, top: hoverInfo.y }}>
                        <b>
                            {' '}
                            {hoverInfo.object.properties.name !== undefined &&
                                hoverInfo.object.properties.name}{' '}
                        </b>
                        <p>
                            {' '}
                            {hoverInfo.object.properties.nodeType !==
                                undefined &&
                                hoverInfo.object.properties.nodeType}{' '}
                        </p>
                        <b>
                            {' '}
                            {hoverInfo.object.properties.transmissionPower !==
                                undefined &&
                                hoverInfo.object.properties.transmissionPower +
                                    'kV ' +
                                    hoverInfo.object.properties.lineType +
                                    ' line'}{' '}
                        </b>
                        <p>
                            {' '}
                            {hoverInfo.object.properties.nodes !== undefined &&
                                'Between ' +
                                    hoverInfo.object.properties.nodes.join(
                                        ' & '
                                    )}{' '}
                        </p>
                    </Tooltip>
                )}
                <OptionsPanel />
            </MapGL>
        )
    }
}

export { ElectricGrid }
