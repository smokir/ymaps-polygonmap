import Colorize from './colorize/index';

/**
 *
 * @this context Polygonmap
 */
const defaultMapper = function (feature) {
    const colorize = new Colorize(this.pointsCountMaximum, this.options.get('color'));

    feature.options = {
        fillColor: colorize.getColor(feature.properties.pointsCount)
    };

    return feature;
};

export default defaultMapper;
