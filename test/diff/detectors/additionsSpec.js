import additions from '../../../src/diff/detectors/additions'

const local = [
  { name: '1234', attr: 2 },
  { name: '77910', attr: 2 },
];

const server = [
  { name: '1234', attr: 1 },
  { name: '3456', attr: 2 },
];

describe("diffing for additions", () => {
  const result = additions(local, server);

  it('detects additions', () => {
    expect(result).to.eql([{ name: '77910', attr: 2 }])
  });
});
