import axios from 'axios'

const electricGrid = async url => {
    // Source data GeoJSON
    if (!url) {
        url =
            'https://development-data-hub-s3-public.s3.amazonaws.com/ddhfiles/145365/electric-network-mena.geojson'
    }
    const response = await axios.get(url)
    return response.data
}

export { electricGrid }
