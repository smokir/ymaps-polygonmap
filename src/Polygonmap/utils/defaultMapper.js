import RangeMapper from './rangeMapper';

/**
 *
 * @this context Polygonmap
 */
const defaultMapper = function (feature) {
    const rangeMapper = new RangeMapper(this.pointsCountMaximum, this.options.get('color'));

    feature.options = {
        fillColor: rangeMapper.getColor(feature.properties.pointsCount)
    };

    return feature;
};

export default defaultMapper;
