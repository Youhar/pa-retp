import React, {Component} from 'react';
import {setParameters} from 'luma.gl';
import DeckGL, {GeoJsonLayer} from 'deck.gl';

const LIGHT_SETTINGS = {
    lightsPosition: [0, 50.5, 8000, 30, 48.5, 8000],
    ambientRatio: 0.2,
    diffuseRatio: 0.5,
    specularRatio: 0.3,
    lightsStrength: [0.8, 0.0, 0.8, 0.0],
    numberOfLights: 2
};

export default class DeckGLOverlay extends Component {

    static get defaultViewport() {
        return {
            latitude: 30,
            longitude: 22,
            zoom: 3.2,
            maxZoom: 16,
            pitch: 30,
            bearing: 0
        };
    }

    _initialize(gl) {
        setParameters(gl, {
            depthTest: true,
            depthFunc: gl.LEQUAL
        });
    }

    render() {
        const {viewport, data, colorScale} = this.props;

        if (!data) {
            return null;
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
                if(f.properties.nodeType === "city") return 50 * (viewport.maxZoom - viewport.zoom) * (viewport.maxZoom - viewport.zoom);
                else return 30 * (viewport.maxZoom - viewport.zoom) * (viewport.maxZoom - viewport.zoom)
            },
            getFillColor: f => {
                if(f.properties.nodeType === "city") return [255, 153, 51];
                else if(f.properties.nodeType === "plant") return [255, 102, 102];
                else if(f.properties.nodeType === "dam") return [51, 153, 255];
                else if(f.properties.nodeType === "town") return [255, 153, 51];
            },
            getLineWidth: f => {
                if(f.properties.lineType === "triple") return 30 * (viewport.maxZoom - viewport.zoom) * (viewport.maxZoom - viewport.zoom);
                else if(f.properties.lineType === "double")  return 20 * (viewport.maxZoom - viewport.zoom) * (viewport.maxZoom - viewport.zoom);
                else if(f.properties.lineType === "single") return 10 * (viewport.maxZoom - viewport.zoom) * (viewport.maxZoom - viewport.zoom)
            },
            getLineColor: f => colorScale(f.properties.transmissionPower/600),
            lightSettings: LIGHT_SETTINGS,
            pickable: Boolean(this.props.onHover),
            onHover: this.props.onHover,
            updateTriggers: {
                getRadius: viewport.zoom,
                getLineWidth: viewport.zoom
            }
        });

        return (
            <DeckGL {...viewport} layers={ [layer] } onWebGLInitialized={this._initialize} />
        );
    }
}
