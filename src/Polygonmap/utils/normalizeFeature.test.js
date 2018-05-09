import {describe, it} from 'mocha';
import {expect} from 'chai';

import normalizeFeature from './normalizeFeature';

const points = {
    type: 'FeatureCollection',
    features: [
        {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [37.64, 55.76]
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
                type: 'MultiPolygon',
                coordinates: [
                    [
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
                    [
                        [
                            [37.68, 55.78],
                            [37.68, 55.79],
                            [37.69, 55.79],
                            [37.69, 55.78],
                            [37.68, 55.78]
                        ]
                    ]
                ]
            }
        }
    ]
};

describe('normalizeFeature', () => {
    it('should convert MultiPolygon type of geometry to Polygon', () => {
        const expectedType = 'Polygon';
        const result = normalizeFeature(polygons.features[0]);

        const geometry = result.geometry;

        expect(geometry.type).to.be.equal(expectedType);
        expect(geometry.coordinates).lengthOf(4);
        expect(geometry.coordinates[0]).lengthOf(4);
        expect(geometry.coordinates[0][0]).lengthOf(2);
        expect(geometry.coordinates[0][0][0]).to.be.a('number');
    });

    it('should add a property fillRule and it should to be equal \'evenOdd\'', () => {
        const expectedFillRule = 'evenOdd';
        const result = normalizeFeature(polygons.features[0]);
        const geometry = result.geometry;

        expect(geometry.fillRule).to.be.equal(expectedFillRule);
    });

    it('should save type if it is not a MultiPolygon type of geometry', () => {
        const expectedType = points.features[0].geometry.type;
        const result = normalizeFeature(points.features[0]);
        const geometry = result.geometry;

        expect(geometry.type).to.be.equal(expectedType);
    });
});
