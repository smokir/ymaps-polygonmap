import reverseCoordinates from './reverseCoordinates';

const normalizeFeature = (feature, props = {}, meta) => {
    let coordinates;
    let type = feature.geometry.type;

    if (feature.geometry.type === 'MultiPolygon') {
        type = 'Polygon';
        coordinates = feature.geometry.coordinates.reduce((acc, coordinates) => {
            if (typeof meta !== 'undefined' && meta.coordinatesOrder === 'longlat') {
                return acc.concat(coordinates);
            } else {
                return acc.concat(reverseCoordinates(coordinates));
            }
        }, []);
    } else {
        if (typeof meta !== 'undefined' && meta.coordinatesOrder === 'longlat') {
            coordinates = feature.geometry.coordinates;
        } else {
            coordinates = reverseCoordinates(feature.geometry.coordinates);
        }
    }

    return Object.assign({}, feature, props, {geometry: {type, coordinates}});
};

export default normalizeFeature;
