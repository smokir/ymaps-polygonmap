import {describe, it} from 'mocha';
import {expect} from 'chai';

import defaultMapper from './defaultMapper';

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
                        [37.60, 55.80],
                        [37.60, 55.70]
                    ],
                    [
                        [37.61, 55.72],
                        [37.61, 55.74],
                        [37.63, 55.74],
                        [37.63, 55.72],
                        [37.61, 55.72]
                    ]
                ],
                fillRule: 'evenOdd'
            },
            properties: {
                pointsCount: 10,
                pointsCountMaximum: 100
            }
        }
    ]
};

describe('defaultMapper', () => {
    it('should return object with Feature type', () => {
        const expectedType = 'Feature';
        const result = defaultMapper(polygons.features[0]);

        expect(result.type).to.be.equal(expectedType);
    });

    it('should add a property fillColor to options', () => {
        const result = defaultMapper(polygons.features[0]);

        expect(result.options).to.have.own.property('fillColor');
    });
});
