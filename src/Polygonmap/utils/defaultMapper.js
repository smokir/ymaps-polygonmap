const defaultMapper = (feature) => {
    const k = feature.properties.pointsCount / feature.properties.pointsCountMaximum;

    const R = 0;
    const G = 102;
    const B = 255;
    const alpha = k === 0 ? 0 : 0.2 + k * 0.8;

    feature.options = {
        fillColor: `rgba(${R}, ${G}, ${B}, ${alpha})`
    };

    return feature;
};

export default defaultMapper;
