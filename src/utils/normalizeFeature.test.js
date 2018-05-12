import {describe, it} from 'mocha';
import {expect} from 'chai';

import normalizeFeature from './normalizeFeature';

describe('normalizeFeature', () => {
    let output;
    let input;

    beforeEach(() => {
        output = normalizeFeature(input);
    });

    describe('for MultiPolygon type of geometry', () => {
        before(() => {
            input = {
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
            };
        });

        it('will change MultiPolygon to Polygon type of geometry', () => {
            expect(output.geometry.type).to.be.equal('Polygon');
        });

        it('will flat coordinates array', () => {
            expect(output.geometry.coordinates).lengthOf(3);
            expect(output.geometry.coordinates[0]).lengthOf(5);
            expect(output.geometry.coordinates[0][0]).lengthOf(2);
            expect(output.geometry.coordinates[0][0][0]).to.be.a('number');
        });
    });

    describe('for other type of geometry', () => {
        before(() => {
            input = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [37.64, 55.76]
                }
            };
        });

        it('will save original type of geometry', () => {
            expect(output.geometry.type).to.be.equal(input.geometry.type);
        });
    });

    describe('for all type of geometry', () => {
        before(() => {
            input = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [37.64, 55.76]
                }
            };
        });

        it('will contains field fillRule equals \'evenOdd\'', () => {
            expect(output.geometry.fillRule).to.be.equal('evenOdd');
        });
    });
});
