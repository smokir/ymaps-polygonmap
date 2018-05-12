import {describe, it} from 'mocha';
import {expect, assert} from 'chai';

import Colorize from './index';

const maxPointsCount = 101;
const minPointsCount = 0;
const checkedValue = 94;
const options = {
    rangesCount: 10,
    colormap: 'cdom',
    format: 'rgbaString',
    alpha: 1
};
const hexOptions = Object.assign({}, options, {format: 'hex'});
const alphaOptions = Object.assign({}, options, {alpha: 0.7, format: 'rba'});

describe('colorize', () => {
    describe('check returned colorMap', () => {
        it('should return array', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const expected = colorize.getColorMap();
            assert.typeOf(expected, 'Array');
        });

        it('should return array of 10 elements', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const expected = colorize.getColorMap();
            assert.lengthOf(expected, 10);
        });
    });

    describe('check returned color type', () => {
        it('should return rgba', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const color = colorize.getColor(checkedValue);
            const expected = new RegExp('rgba').test(color);
            assert.equal(expected, true);
        });
        it('should return hex', () => {
            const colorize = new Colorize(maxPointsCount, hexOptions);
            const color = colorize.getColor(checkedValue);
            const expected = new RegExp('#').test(color);
            assert.equal(expected, true);
        });
    });

    describe('check returned color value', () => {
        it('should return right rgba color for max value', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const expected = colorize.getColorMap()[0];
            const result = colorize.getColor(maxPointsCount);
            expect(result).to.be.equal(expected);
        });

        it('should return right rgba color for min value', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const expected = colorize.getColorMap()[9];
            const result = colorize.getColor(minPointsCount);
            expect(result).to.be.equal(expected);
        });

        it('should return correct alpha channel value', () => {
            const colorize = new Colorize(maxPointsCount, alphaOptions);
            const expected = 0.7;
            const result = colorize.getColor(checkedValue);
            expect(result[3]).to.be.equal(expected);
        });
    });
});
