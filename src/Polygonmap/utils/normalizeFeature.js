import reverseCoordinates from './reverseCoordinates';

const normalizeFeature = (feature, meta, props = {}) => {
    let coordinates;
    let type = feature.geometry.type;

    if (feature.geometry.type === 'MultiPolygon') {
        type = 'Polygon';
        if (typeof meta !== 'undefined' && meta.coordinatesOrder === 'longlat') {
            coordinates = feature.geometry.coordinates.reduce((acc, coordinates) => {
                return acc.concat(coordinates);
            }, []);
        } else {
            coordinates = feature.geometry.coordinates.reduce((acc, coordinates) => {
                return acc.concat(reverseCoordinates(coordinates));
            }, []);
        }
    } else {
        if (typeof meta !== 'undefined' && meta.coordinatesOrder === 'longlat') {
            coordinates = feature.geometry.coordinates;
        } else {
            coordinates = reverseCoordinates(feature.geometry.coordinates);
        }
    }

    return Object.assign({}, props, feature, {geometry: {type, coordinates}});
};

export default normalizeFeature;
