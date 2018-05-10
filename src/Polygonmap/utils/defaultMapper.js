/**
 * Function of iterative transformation of features.
 *
 * @param {Object} feature Ymaps feature data.
 * @returns {Object} Transformed ymaps feature data.
 * @this Polygonmap
 */
const defaultMapper = function (feature) {
    feature.options = {
        fillColor: this.colorize.getColor(feature.properties.pointsCount)
    };

    return feature;
};

export default defaultMapper;
