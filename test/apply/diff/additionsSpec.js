import additions from '../../../src/apply/diff/additions'

const local = [
  { uuid: '1234', attr: 2 },
  { uuid: '77910', attr: 2 },
];

const server = [
  { uuid: '1234', attr: 1 },
  { uuid: '3456', attr: 2 },
];

describe("diffing for additions", () => {
  const result = additions(local, server);

  it('detects additions', () => {
    expect(result).to.eql([{ uuid: '77910', attr: 2 }])
  });
});
