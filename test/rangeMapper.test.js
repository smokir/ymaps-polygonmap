import {describe, it} from 'mocha';
import {expect, assert} from 'chai';

import RangeMapper from '../src/Polygonmap/utils/rangeMapper';

const maxPointsCount = 154;
const options = {
    rangesCount: 10,
    colormap: 'cdom',
    format: 'rgbaString',
    alpha: 1
};
const hexOptions = Object.assign({}, options, {format: 'hex'});
const alphaOptions = Object.assign({}, options, {alpha: 0.7, format: 'rba'});

describe('rangeMapper', () => {
    describe('check returned colorMap', () => {
        it('should return array', () => {
            const rangeMapper = new RangeMapper(maxPointsCount, options);
            const expected = rangeMapper.getColorMap();
            assert.typeOf(expected, 'Array');
        });

        it('should return array of 10 elements', () => {
            const rangeMapper = new RangeMapper(maxPointsCount, options);
            const expected = rangeMapper.getColorMap();
            assert.lengthOf(expected, 10);
        });
    });

    describe('check returned color type', () => {
        it('should return rgba', () => {
            const rangeMapper = new RangeMapper(maxPointsCount, options);
            const color = rangeMapper.getColor(94);
            const expected = new RegExp('rgba').test(color);
            assert.equal(expected, true);
        });
        it('should return hex', () => {
            const rangeMapper = new RangeMapper(maxPointsCount, hexOptions);
            const color = rangeMapper.getColor(94);
            const expected = new RegExp('#').test(color);
            assert.equal(expected, true);
        });
    });

    describe('check returned color value', () => {
        it('should return rgba(47,15,62,1)', () => {
            const rangeMapper = new RangeMapper(maxPointsCount, options);
            const expected = 'rgba(47,15,62,1)';
            const result = rangeMapper.getColor(94);
            expect(result).to.be.equal(expected);
        });

        it('should return correct alpha channel value', () => {
            const rangeMapper = new RangeMapper(maxPointsCount, alphaOptions);
            const expected = 0.7;
            const result = rangeMapper.getColor(94);
            expect(result[3]).to.be.equal(expected);
        });

        it('should return #2f0f3e', () => {
            const rangeMapper = new RangeMapper(maxPointsCount, hexOptions);
            const expected = '#2f0f3e';
            const result = rangeMapper.getColor(94);
            expect(result).to.be.equal(expected);
        });
    });
});
