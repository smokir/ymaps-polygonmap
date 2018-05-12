import {describe, it} from 'mocha';
import {expect, assert} from 'chai';

import Colorize from './colorize';

const maxPointsCount = 101;
const minPointsCount = 0;

describe('colorize', () => {
    let defaultOptions;
    let customOptions;

    beforeEach(() => {
        defaultOptions = {
            colorRanges: 10,
            colorScheme: 'cdom'
        };

        customOptions = {
            colorRanges: [150, 50, 20],
            colorScheme: ['#eee', '#ddd', '#fff']
        };
    });

    describe('check returned colorMap', () => {
        it('should return array', () => {
            const colorize = new Colorize(maxPointsCount, defaultOptions);
            const expected = colorize.getColorMap();
            assert.isArray(expected);
        });

        it('should return array of 10 elements', () => {
            const colorize = new Colorize(maxPointsCount, defaultOptions);
            const expected = colorize.getColorMap();
            assert.lengthOf(expected, 10);
        });
    });

    describe('check returned color value', () => {
        it('should return correct color for max value', () => {
            const colorize = new Colorize(maxPointsCount, defaultOptions);
            const expected = colorize.getColorMap()[0];
            const result = colorize.getColor(maxPointsCount);
            expect(result).to.be.equal(expected);
        });

        it('should return correct color for min value', () => {
            const colorize = new Colorize(maxPointsCount, defaultOptions);
            const expected = colorize.getColorMap()[9];
            const result = colorize.getColor(minPointsCount);
            expect(result).to.be.equal(expected);
        });
    });

    describe('check returned color value from custom options', () => {
        it('should return correct colorScheme array', () => {
            const colorize = new Colorize(maxPointsCount, customOptions);
            const expected = customOptions.colorScheme.length;
            const result = colorize.getColorMap().length;

            expect(result).to.be.equal(expected);
        });

        it('should return correct color for min value', () => {
            const colorize = new Colorize(maxPointsCount, customOptions);
            const expected = colorize.getColorMap()[customOptions.colorScheme.length - 1];
            const result = colorize.getColor(minPointsCount);
            expect(result).to.be.equal(expected);
        });

        it('should return correct color for max value', () => {
            const colorize = new Colorize(maxPointsCount, customOptions);
            const expected = colorize.getColorMap()[0];
            const result = colorize.getColor(maxPointsCount);
            expect(result).to.be.equal(expected);
        });
    });
});
