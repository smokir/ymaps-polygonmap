import RangeMapper from './rangeMapper';

const defaultMapper = (feature, i, pointsCountMaximum) => {
    const rangeMapper = new RangeMapper(10, pointsCountMaximum);

    feature.options = {
        fillColor: rangeMapper.getColor(feature.properties.pointsCount)
    };

    return feature;
};

export default defaultMapper;
