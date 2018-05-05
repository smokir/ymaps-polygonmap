import {describe, it} from 'mocha';
import {expect} from 'chai';

describe('identity', () => {
    it('should work', () => {
        const expected = 'It\'s work!';
        expect(expected).to.be.equal(expected);
    });
});
