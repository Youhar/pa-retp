import { GeoJsonLayer } from '@deck.gl/layers'
import DeckGL from 'deck.gl'
import React from 'react'

const LIGHT_SETTINGS = {
    lightsPosition: [0, 50.5, 8000, 30, 48.5, 8000],
    ambientRatio: 0.2,
    diffuseRatio: 0.5,
    specularRatio: 0.3,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
}

class ElectricMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewState: {
                ...ElectricMap.defaultViewState
            }
        }
    }

    static get defaultViewState() {
        return {
            latitude: 30,
            longitude: 34,
            zoom: 3.2,
            maxZoom: 16,
            pitch: 30,
            bearing: 0
        }
    }

    onViewStateChange = ({ viewState }) => {
        this.setState({
            viewState: { ...this.state.viewState, ...viewState },
            hoverInfo: null
        })
    }

    render() {
        const { data, colorScale, onHover } = this.props

        if (!data) {
            return null
        }

        const layer = new GeoJsonLayer({
            id: 'geojson',
            data,
            opacity: 0.8,
            stroked: false,
            filled: true,
            extruded: true,
            wireframe: true,
            fp64: true,
            getRadius: f => {
                if (f.properties.nodeType === 'city')
                    return (
                        50 *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom) *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom)
                    )
                else
                    return (
                        30 *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom) *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom)
                    )
            },
            getFillColor: f => {
                if (f.properties.nodeType === 'city') return [255, 153, 51]
                else if (f.properties.nodeType === 'plant')
                    return [255, 102, 102]
                else if (f.properties.nodeType === 'dam') return [51, 153, 255]
                else if (f.properties.nodeType === 'town')
                    return [102, 102, 255]
            },
            getLineWidth: f => {
                if (f.properties.lineType === 'triple')
                    return (
                        30 *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom) *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom)
                    )
                else if (f.properties.lineType === 'double')
                    return (
                        20 *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom) *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom)
                    )
                else if (f.properties.lineType === 'single')
                    return (
                        10 *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom) *
                        (this.state.viewState.maxZoom -
                            this.state.viewState.zoom)
                    )
            },
            getLineColor: f => colorScale(f.properties.transmissionPower / 600),
            lightSettings: LIGHT_SETTINGS,
            pickable: Boolean(onHover),
            onHover,
            updateTriggers: {
                getRadius: this.state.viewState.zoom,
                getLineWidth: this.state.viewState.zoom
            }
        })

        return (
            <DeckGL
                initialViewState={this.state.viewState}
                onViewStateChange={this.onViewStateChange}
                controller={true}
                layers={[layer]}
            />
        )
    }
}

export { ElectricMap }
