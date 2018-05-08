import {describe, it} from 'mocha';
import {expect} from 'chai';

import inside from './inside';

const points = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [37.64, 55.76]
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [37.60, 55.70]
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [37.00, 55.00]
            }
        },
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [37.62, 55.73]
            }
        }
    ]
};

const polygons = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [37.60, 55.70],
                        [37.70, 55.70],
                        [37.70, 55.80],
                        [37.60, 55.80]
                    ],
                    [
                        [37.61, 55.72],
                        [37.61, 55.72],
                        [37.63, 55.74],
                        [37.63, 55.74]
                    ],
                    [
                        [37.68, 55.78],
                        [37.68, 55.78],
                        [37.69, 55.79],
                        [37.69, 55.79]
                    ]
                ],
                fillRule: 'evenOdd'
            }
        }
    ]
};

describe('inside', () => {
    it('should return true for point that is inside', () => {
        const expected = true;
        const result = inside(polygons.features[0].geometry, points.features[0].geometry);

        expect(result).to.be.equal(expected);
    });

    it('should return true for point that is on border', () => {
        const expected = true;
        const result = inside(polygons.features[0].geometry, points.features[1].geometry);

        expect(result).to.be.equal(expected);
    });

    it('should return false for point that is outside', () => {
        const expected = false;
        const result = inside(polygons.features[0].geometry, points.features[2].geometry);

        expect(result).to.be.equal(expected);
    });

    it('should return false for point that is in hole', () => {
        const expected = false;
        const result = inside(polygons.features[0].geometry, points.features[3].geometry);

        expect(result).to.be.equal(expected);
    });
});
