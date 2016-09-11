import R from 'ramda'
import changes from '../../../src/apply/diff/changes'

const local = [
  { name: '1234', attr: 2, bobby: "tables", fake: { once: 1 }, empty: [], hashpty: {}, doubler: [1, 2] },
  { name: '999', attr: 1, same: "tbh" },
  { name: '77910', attr: 2 },
];

const server = [
  { name: '1234', attr: 1, bubble: "bath", fake: { twice: 2 }, empty: [1,2,3], hashpty: { one: 'once' }, dingo: { one: 2 }, doubler: [1, 2] },
  { name: '999', attr: 1, same: "for real" },
  { name: '3456', attr: 2 },
];

const filter = R.pick(['attr']);

describe("diffing for changes", () => {
  const result  = changes(filter)(local, server);

  it('returns only filtered fields changed', () => {
    expect(R.pluck('name', result)).to.eql(['1234']);
  });

  it('merges details from both', () => {
    expect(result[0]).to.have.all.keys('name', 'attr', 'bubble', 'bobby', 'fake', 'empty', 'hashpty', 'dingo', 'doubler');
  });

  it('uses local value for conflicts', () => {
    expect(result[0].attr).to.equal(2);
  });

  it('merges deeply', () => {
    expect(result[0].fake).to.eql({once: 1, twice: 2});
  });

  it('dedups arrays with duplicate items', () => {
    expect(result[0].doubler).to.eql([1,2])
  });

  context('empty', () => {
    it('does not merge array', () => {
      expect(result[0].empty).to.eql([]);
    });

    it('does not merge hash', () => {
      expect(result[0].hashpty).to.eql({});
    });

    it('still merges where missing from local', () => {
      expect(result[0].dingo).to.eql({ one: 2 });
    });
  })
});
