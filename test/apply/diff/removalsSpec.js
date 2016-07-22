import removals from '../../../src/apply/diff/removals'

const local = [
  { name: '1234', attr: 2 },
  { name: '77910', attr: 2 },
];

const server = [
  { name: '1234', attr: 1 },
  { name: '3456', attr: 2 },
];

describe("diffing for removals", () => {
  const result = removals(local, server);

  it('detects additions', () => {
    expect(result).to.eql([{ name: '3456', attr: 2 }])
  });
});
