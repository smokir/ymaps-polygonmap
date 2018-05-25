/**
 * Function of iterative transformation of features.
 *
 * @param {Object} feature Ymaps feature data.
 * @returns {Object} Transformed ymaps feature data.
 * @this Polygonmap
 */
const defaultMapper = function (feature) {
    const {pointsCount, pointsWeight} = feature.properties;
    let fillColor;

    if (pointsCount === 0) {
        fillColor = this.options.get('fillColorEmptyPolygon');
    } else {
        const colorNumber = this.options.get('fillBy') === 'weight' ?
            pointsWeight :
            pointsCount;

        fillColor = this.colorize.getColor(colorNumber);
    }

    feature.options = {
        fillColor,
        fillOpacity: this.options.get('fillOpacity'),
        strokeWidth: this.options.get('strokeWidth'),
        strokeColor: this.options.get('strokeColor')
    };

    return feature;
};

export default defaultMapper;
