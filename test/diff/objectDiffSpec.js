import objectDiff from '../../src/diff/objectDiff'

const lhs = {
  one: 1,
  two: [1,2],
  three: { more: 'items', over: 'here' },
  four: 'four',
  five: 5,
};

const rhs = {
  one: 1,
  two: [1,3],
  three: { more: 'robots', over: 'here' },
  four: 4,
  six: 6,
};

describe("deep diffing", () => {
  const diff = objectDiff(lhs, rhs);

  it('only detects changed', () => {
    expect(diff).to.have.all.keys('two', 'three', 'four', 'five', 'six');
  });

  it('diffs arrays by returning the full array of items', () => {
    expect(diff.two).to.eql([[1,2], [1,3]])
  });

  it('diffs objects by returning only changed items', () => {
    expect(diff.three).to.eql({more: ['items', 'robots']});
  });

  it('detects plain value differences', () => {
    expect(diff.four).to.eql(['four', 4])
  });

  it('detects removed values', () => {
    expect(diff.five).to.eql([5, undefined])
  });

  it('detects added values', () => {
    expect(diff.six).to.eql([undefined, 6])
  })
});
