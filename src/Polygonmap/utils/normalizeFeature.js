/**
 * Normalization of the GeoJSON feature for the ymaps.
 *
 * @param {Object} feature GeoJSON feature data
 * @param {Object} meta ymaps metadata
 * @param {Object} props={} additional options for the feature
 * @returns {Object}
 */
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
            // This parameter is needed for drawing holes in polygons on ymaps
            fillRule: 'evenOdd'
        }
    });
};

export default normalizeFeature;
