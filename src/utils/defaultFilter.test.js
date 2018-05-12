import {describe, it} from 'mocha';
import {expect} from 'chai';

import defaultFilter from './defaultFilter';

describe('defaultFilter', () => {
    let output;
    let input;

    beforeEach(() => {
        output = defaultFilter(input);
    });

    describe('given that the feature contains points', () => {
        before(() => {
            input = {
                type: 'Feature',
                properties: {
                    pointsCount: 10
                }
            };
        });

        it('will return true', () => {
            expect(output).to.be.equal(true);
        });
    });

    describe('given that the feature not contains points', () => {
        before(() => {
            input = {
                type: 'Feature',
                properties: {
                    pointsCount: 0
                }
            };
        });

        it('will return false', () => {
            expect(output).to.be.equal(false);
        });
    });
});
