const normalizeFeature = (feature, meta, props = {}) => {
    let {type, coordinates} = feature.geometry;

    if (feature.geometry.type === 'MultiPolygon') {
        type = 'Polygon';
        coordinates = feature.geometry.coordinates
            .reduce((acc, coordinates) => acc.concat(coordinates), []);
    }

    return Object.assign({}, props, feature, {
        geometry: {
            type,
            coordinates,
            fillRule: 'evenOdd'
        }
    });
};

export default normalizeFeature;
