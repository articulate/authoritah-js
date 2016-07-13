import R from 'ramda'
import changes from '../../../src/apply/diff/changes'

const local = [
  { uuid: '1234', attr: 2, bobby: "tables" },
  { uuid: '999', attr: 1, same: "tbh" },
  { uuid: '77910', attr: 2 },
];

const server = [
  { uuid: '1234', attr: 1, bubble: "bath" },
  { uuid: '999', attr: 1, same: "for real" },
  { uuid: '3456', attr: 2 },
];

const filter = R.pick(['attr']);

describe("diffing for changes", () => {
  const result  = changes(filter)(local, server);

  it('returns only filtered fields changed', () => {
    expect(R.pluck('uuid', result)).to.eql(['1234']);
  });

  it('merges details from both, overriding from local config', () => {
    expect(result[0]).to.eql({ uuid: '1234', attr: 2, bubble: 'bath', bobby: 'tables' });
  });
});
