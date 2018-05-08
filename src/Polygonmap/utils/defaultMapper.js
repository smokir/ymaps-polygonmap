/**
 *
 * @this context Polygonmap
 */
const defaultMapper = function (feature) {
    feature.options = {
        fillColor: this.colorize.getColor(feature.properties.pointsCount)
    };

    return feature;
};

export default defaultMapper;
