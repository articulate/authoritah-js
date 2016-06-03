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

  it("returns an empty object when it doesnt exist", () => {
    expect(configManager("nope.json").config).to.eql({});
  });

  context('getting', () => {
    it('can retrieve single values', () => {
      expect(manager.get('test')).to.equal("one");
    });
  });

  context('setting', () => {
    after(() => {
      manager.remove("key")
    });

    it('can set single value', () => {
      manager.set('key', 'value')
      expect(manager.get('key'))

    });
  });

  context('remove', () => {

  });


});
