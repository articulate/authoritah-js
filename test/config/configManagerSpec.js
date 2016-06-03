import configManager from '../../src/config/configManager'

describe("configManager", () => {
  const manager = configManager('./test/fixtures/config.json');

  it("loads config from file", () => {
    expect(manager.config).to.eql({
                                   test: "one",
                                   other: 2,
                                   works: true
                                 })
  });

  it("returns an empty object when it doesn't exist", () => {
    expect(configManager("nope.json").config).to.eql({});
  });

  context('getting', () => {
    it('can retrieve single values', () => {
      expect(manager.get('test')).to.equal("one");
    });

    context('default values', () => {
      it('returned if none found', () => {
        expect(manager.get('what', 123)).to.equal(123);
      });

      it('returns found value if exists', () => {
        expect(manager.get('test', 123)).to.equal("one");
      });
    });
  });

  context('setting', () => {
    after(() => {
      manager.remove("key")
    });

    it('can set single value', () => {
      manager.set('key', 'value');
      expect(manager.get('key'))
    });
  });

  context('remove', () => {
    beforeEach(() => {
      manager.set('new', 'old');
    });

    it('can remove a single key', () => {
      manager.remove('new');
      expect(manager.get('new')).to.be.undefined;
    });

    it('can remove multiple keys', () => {
      manager.set('old', 'new');
      manager.remove('new', 'old');
      expect(manager.config).not.to.have.any.keys(['old', 'new']);
    });
  });


});
