import parser from '../../src/utils/versionParser'

describe("versionParser", () => {
  it('parses version from package.json', () => {
    return expect(parser()).to.eventually.match(/\d+.\d+.\d+/)
  });
});
