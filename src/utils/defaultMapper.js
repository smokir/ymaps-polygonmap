/**
 * Function of iterative transformation of features.
 *
 * @param {Object} feature Ymaps feature data.
 * @returns {Object} Transformed ymaps feature data.
 * @this Polygonmap
 */
const defaultMapper = function (feature) {
    const fillColor = feature.properties.pointsCount === 0 ?
        this.options.get('colorEmptyPolygon') :
        this.colorize.getColor(this.options.get('colorBy') === 'weight' ?
            feature.properties.pointsWeight :
            feature.properties.pointsCount);

    feature.options = {
        fillColor,
        fillOpacity: this.options.get('colorOpacity'),
        strokeWidth: this.options.get('strokeWidth'),
        strokeColor: this.options.get('strokeColor')
    };

    return feature;
};

export default defaultMapper;
