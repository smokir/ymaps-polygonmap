import Colorize from './colorize/index';

/**
 *
 * @this context Polygonmap
 */
const defaultMapper = function (feature) {
    const colorize = new Colorize(this.pointsCountMaximum, this.options.get('color'));
    if (feature.properties.pointsCount > 0 && feature.properties.pointsCount < 100) {
        feature.options = {
            fillColor: colorize.getColor(feature.properties.pointsCount),
            strokeColor: '999999'
        };
    } else if (feature.properties.pointsCount >= 160) {
        feature.options = {
            fillColor: colorize.getColor(99),
            strokeColor: '999999'
        };
    } else if (feature.properties.pointsCount >= 120) {
        feature.options = {
            fillColor: colorize.getColor(70),
            strokeColor: '999999'
        };
    } else if (feature.properties.pointsCount >= 100) {
        feature.options = {
            fillColor: colorize.getColor(60),
            strokeColor: '999999'
        };
    } else {
        feature.options = {
            fillColor: 'aaaaaa00',
            strokeColor: '999999'
        };
    }

    return feature;
};

export default defaultMapper;
