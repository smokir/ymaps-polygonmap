import {describe, it} from 'mocha';
import {expect} from 'chai';

import defaultMapper from './defaultMapper';

describe('defaultMapper', () => {
    let output;
    let input;

    beforeEach(() => {
        output = defaultMapper(input);
    });

    describe('given that the feature contains something intresting', () => {
        before(() => {
            input = {
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
                    ]
                },
                properties: {
                    pointsCount: 10,
                    pointsCountMaximum: 100
                }
            };
        });

        it('will contains field type equals \'Feature\'', () => {
            expect(output).to.have.own.property('type');
            expect(output.type).to.be.equal('Feature');
        });

        it('will contains field fillColor in options', () => {
            expect(output.options).to.have.own.property('fillColor');
        });
    });
});
