import {describe, it} from 'mocha';
import {expect, assert} from 'chai';

import Colorize from './index';

const maxPointsCount = 154;
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
            const color = colorize.getColor(94);
            const expected = new RegExp('rgba').test(color);
            assert.equal(expected, true);
        });
        it('should return hex', () => {
            const colorize = new Colorize(maxPointsCount, hexOptions);
            const color = colorize.getColor(94);
            const expected = new RegExp('#').test(color);
            assert.equal(expected, true);
        });
    });

    describe('check returned color value', () => {
        it('should return rgba(47,15,62,1)', () => {
            const colorize = new Colorize(maxPointsCount, options);
            const expected = 'rgba(47,15,62,1)';
            const result = colorize.getColor(94);
            expect(result).to.be.equal(expected);
        });

        it('should return correct alpha channel value', () => {
            const colorize = new Colorize(maxPointsCount, alphaOptions);
            const expected = 0.7;
            const result = colorize.getColor(94);
            expect(result[3]).to.be.equal(expected);
        });

        it('should return #2f0f3e', () => {
            const colorize = new Colorize(maxPointsCount, hexOptions);
            const expected = '#2f0f3e';
            const result = colorize.getColor(94);
            expect(result).to.be.equal(expected);
        });
    });
});
