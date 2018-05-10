import {describe, it} from 'mocha';
import {expect} from 'chai';

import inside from './inside';

describe('inside', () => {
    let output;
    let input0;
    let inputs1;
    let i = 0;

    beforeEach(() => {
        output = inside(input0, inputs1[i]);
        i++;
    });

    describe('should return boolean', () => {
        before(() => {
            input0 = {
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
                    ],
                    [
                        [37.68, 55.78],
                        [37.68, 55.79],
                        [37.69, 55.79],
                        [37.69, 55.78],
                        [37.68, 55.78]
                    ]
                ]
            };
            inputs1 = [
                {type: 'Point', coordinates: [37.64, 55.76]},
                {type: 'Point', coordinates: [37.60, 55.70]},
                {type: 'Point', coordinates: [37.00, 55.00]},
                {type: 'Point', coordinates: [37.62, 55.73]}
            ];
        });

        it('should return true if point is inside polygon', () => {
            expect(output).to.be.equal(true);
        });

        it('should return true if point is on border', () => {
            expect(output).to.be.equal(true);
        });

        it('should return false if point is outside', () => {
            expect(output).to.be.equal(false);
        });

        it('should return false if point is inside hole', () => {
            expect(output).to.be.equal(false);
        });
    });
});
