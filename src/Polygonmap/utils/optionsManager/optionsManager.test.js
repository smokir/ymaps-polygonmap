import {describe, it} from 'mocha';
import {expect, assert} from 'chai';

import OptionsManager from './index';

const defaultSettings = {
    mapper: function (a) {
        return a * a;
    },
    color: {
        rangesCount: 10,
        colormap: 'cdom',
        format: 'rgbaString',
        alpha: 0.7
    }
};

const userSettings = {
    mapper: function (a) {
        return a + a * a;
    },
    color: {
        rangesCount: 5
    }
};

describe('optionsManager', () => {
    describe('check extend settings', () => {
        it('should return correct option value', () => {
            const options = new OptionsManager(defaultSettings, userSettings).options;
            const expected = userSettings.color.rangesCount;
            const result = options.get('color').rangesCount;

            expect(result).to.be.equal(expected);
        });

        it('should execute functions', () => {
            const options = new OptionsManager(defaultSettings, userSettings).options;
            const value = 2;
            const expected = userSettings.mapper(value);
            const result = options.get('mapper')(value);

            expect(result).to.be.equal(expected);
        });

        it('should set value as key,value', () => {
            const options = new OptionsManager(defaultSettings, userSettings);
            const key = 'bla';
            const value = 'blabla';

            options.set(key, value);
            expect(options.get(key)).to.be.equal(value);
        });

        it('should set value as object ', () => {
            const options = new OptionsManager(defaultSettings, userSettings);
            const value = {foo: 'bar'};

            options.set(value);
            expect(options.get('foo')).to.be.equal('bar');
        });

        it('should set value as object with children', () => {
            const options = new OptionsManager(defaultSettings, userSettings);
            const value = {foo: {bar: 'bar', bla: 'bla'}};

            options.set(value);
            assert.include(options.get('foo'), value.foo);
        });
    });
});
