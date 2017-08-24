import React, {Component} from 'react';
import MapGL from 'react-map-gl';
import DeckGLOverlay from '../deckgl-overlays/deckgl-overlay.js';

import {json as requestJson} from 'd3-request';

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.MAPBOX_ACCESS_TOKEN; // eslint-disable-line

// Source data GeoJSON
const DATA_URL = 'https://energydata.info/dataset/a021ecbc-6ede-478f-8236-a8a2b093e363/resource/fe3ffd90-ffed-459a-9c52-bd91deb128f4/download/electric-network-mena.geojson'; // eslint-disable-line

const colorScale = r => [r * 255, 255 * (1 - r), 255 * (r - 0.5) * (r - 0.5)];

export default class ElectricNetworkGL extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewport: {
                ...DeckGLOverlay.defaultViewport,
                width: 1200,
                height: 800
            },
            data: null
        };

        requestJson(DATA_URL, (error, response) => {
            if (!error) {
                this.setState({data: response});
            }
        });

        this._onHover = this._onHover.bind(this)
    }

    componentDidMount() {
        window.addEventListener('resize', this._resize.bind(this));
        this._resize();
    }

    _resize() {
        this._onViewportChange({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    _onViewportChange(viewport) {
        this.setState({
            viewport: {...this.state.viewport, ...viewport},
            hoverInfo: null
        });
    }

    _onHover(info) {
        const hoverInfo = info;
        if (hoverInfo !== this.state.hoverInfo) {
            this.setState({hoverInfo});
        }
    }

    render() {
        const {viewport, data, hoverInfo} = this.state;

        return (
            <MapGL
                {...viewport}
                onViewportChange={this._onViewportChange.bind(this)}
                mapboxApiAccessToken={MAPBOX_TOKEN}>
                <DeckGLOverlay
                    viewport={viewport}
                    data={data}
                    colorScale={colorScale}
                    onHover = {this._onHover} />
                {hoverInfo && <div className="tooltip" style={{left: hoverInfo.x, top: hoverInfo.y}}>
                    <b> {hoverInfo.object.properties.name !== undefined && (hoverInfo.object.properties.name)} </b>
                    <p> {hoverInfo.object.properties.nodeType !== undefined && (hoverInfo.object.properties.nodeType)} </p>
                    <b> {hoverInfo.object.properties.transmissionPower !== undefined && (hoverInfo.object.properties.transmissionPower + 'kV ' + hoverInfo.object.properties.lineType + ' line')} </b>
                    <p> {hoverInfo.object.properties.nodes !== undefined && ('Between ' + hoverInfo.object.properties.nodes.join(' & '))} </p>
                </div>}
            </MapGL>
        );
    }
}
