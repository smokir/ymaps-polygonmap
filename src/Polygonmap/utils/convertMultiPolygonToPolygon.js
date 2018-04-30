const convertMultiPolygonToPolygon = (feature, convertCoordinates) => {
    let coordinates;

    if (feature.geometry.type === 'MultiPolygon') {
        coordinates = feature.geometry.coordinates.reduce((acc, coordinates) => {
            if (typeof convertCoordinates !== 'undefined') {
                return acc.concat(convertCoordinates(coordinates));
            } else {
                return acc.concat(coordinates);
            }
        }, []);
    } else {
        if (typeof convertCoordinates !== 'undefined') {
            coordinates = convertCoordinates(feature.geometry.coordinates);
        } else {
            coordinates = feature.geometry.coordinates;
        }
    }

    return Object.assign({}, feature, {geometry: {type: 'Polygon', coordinates}});
};

export default convertMultiPolygonToPolygon;
