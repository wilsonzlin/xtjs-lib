import chai, {expect} from 'chai';
import {nullStat} from 'fs/stats/getStats';
import chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe('nullStat', () => {
  it('should resolve to null for non-existent files', () => {
    expect(nullStat('./non.existent.file')).to.eventually.equal(null);
  });
});
