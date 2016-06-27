import fs from 'fs-extra'
import saveScripts from '../../src/utils/saveScripts'

const path = './test/fixtures/saveDir';

describe("saveScripts", () => {
  const saveFn = saveScripts(path);

  after(() => {
    fs.remove(path);
  });

  it('generates a save function for a specific dir', () => {
    expect(saveFn).to.be.a('function');
  });

  it('ensures save dir exists', () => {
    const stat = fs.statSync(path);
    expect(stat.isDirectory()).to.be.true;
  });

  it('uses existing dir if exists', () => {
    expect(() => saveScripts(path)).to.not.throw(Error);
  });


  context('saves a script', () => {
    const fn = { name: "bloop", script: "function what() { return 'yes'; }" };
    const result = saveFn(fn);

    it('and returns an updated definition', () => {
      expect(result).to.eql({ name: "bloop", script: "./test/fixtures/saveDir/bloop.js" });
    });

    it('creates a new file', () => {
      const stat = fs.statSync(result.script);
      expect(stat.isFile()).to.be.true;
    });

    it('contains the contents of the script', () => {
      const content = fs.readFileSync(result.script);
      expect(content.toString()).to.equal(fn.script);
    });
  });
});
