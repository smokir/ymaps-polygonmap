import {describe, it} from 'mocha';
import {expect, assert} from 'chai';

import Colorize from './colorize';

const min = 0;
const max = 101;

describe('colorize', () => {
    let defaultOptions;
    let customOptions;

    beforeEach(() => {
        defaultOptions = {
            colorRanges: 10,
            colorScheme: 'cdom'
        };

        customOptions = {
            colorRanges: [20, 50, 150],
            colorScheme: ['#fff', '#ddd', '#eee']
        };
    });

    describe('check returned colorMap', () => {
        it('should return array', () => {
            const colorize = new Colorize(min, max, defaultOptions);
            const expected = colorize.getColorMap();

            assert.isArray(expected);
        });

        it('should return array of 10 elements', () => {
            const colorize = new Colorize(min, max, defaultOptions);
            const expected = colorize.getColorMap();
            assert.lengthOf(expected, 10);
        });
    });

    describe('check returned colorRanges', () => {
        it('should return array', () => {
            const colorize = new Colorize(min, max, defaultOptions);
            const expected = colorize.getColorRanges();
            assert.isArray(expected);
        });

        it('should return array of 10 elements', () => {
            const colorize = new Colorize(min, max, defaultOptions);
            const expected = colorize.getColorRanges();
            assert.lengthOf(expected, 10);
        });
    });

    describe('check returned color value', () => {
        it('should return correct color for max value', () => {
            const colorize = new Colorize(min, max, defaultOptions);
            const colors = colorize.getColorMap();
            const expected = colors[colors.length - 1];
            const result = colorize.getColor(max);
            expect(result).to.be.equal(expected);
        });

        it('should return correct color for min value', () => {
            const colorize = new Colorize(min, max, defaultOptions);
            const expected = colorize.getColorMap()[0];
            const result = colorize.getColor(min);
            expect(result).to.be.equal(expected);
        });
    });

    describe('check returned color value from custom options', () => {
        it('should return correct colorScheme array', () => {
            const colorize = new Colorize(min, max, customOptions);
            const expected = customOptions.colorScheme.length;
            const result = colorize.getColorMap().length;

            expect(result).to.be.equal(expected);
        });

        it('should return correct color for min value', () => {
            const colorize = new Colorize(min, max, customOptions);
            const expected = colorize.getColorMap()[0];
            const result = colorize.getColor(min);
            expect(result).to.be.equal(expected);
        });

        it('should return correct color for max value', () => {
            const colorize = new Colorize(min, max, customOptions);
            const expected = colorize.getColorMap()[customOptions.colorScheme.length - 1];
            const result = colorize.getColor(max);
            expect(result).to.be.equal(expected);
        });
    });
});
