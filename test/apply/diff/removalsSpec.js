import removals from '../../../src/apply/diff/removals'

const local = [
  { uuid: '1234', attr: 2 },
  { uuid: '77910', attr: 2 },
];

const server = [
  { uuid: '1234', attr: 1 },
  { uuid: '3456', attr: 2 },
];

describe("diffing for removals", () => {
  const result = removals(local, server);

  it('detects additions', () => {
    expect(result).to.eql([{ uuid: '3456', attr: 2 }])
  });
});
