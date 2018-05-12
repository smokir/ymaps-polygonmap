import {describe, it} from 'mocha';
import {expect, assert} from 'chai';

import Colorize from './index';

const maxPointsCount = 101;
const minPointsCount = 0;

describe('colorize', () => {
    let options;

    beforeEach(() => {
        options = {
            rangesCount: 10,
            colormap: 'cdom'
        };
    });

    describe('check returned colorMap', () => {
        it('should return array', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const expected = colorize.getColorMap();
            assert.isArray(expected);
        });

        it('should return array of 10 elements', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const expected = colorize.getColorMap();
            assert.lengthOf(expected, 10);
        });
    });

    describe('check returned color value', () => {
        it('should return right rgba color for max value', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const expected = colorize.getColorMap()[0];
            const result = colorize.getColor(maxPointsCount);
            assert.equal(expected, result);
        });

        it('should return right rgba color for min value', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const expected = colorize.getColorMap()[9];
            const result = colorize.getColor(minPointsCount);
            expect(result).to.be.equal(expected);
        });
    });
});
