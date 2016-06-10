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

    it('can retrieve multiple values', () => {
      expect(manager.gets('test', 'works')).to.eql({ test: 'one', works: true });
    });

    context('getsd', () => {
      it('can retrieve values and supply defaults when missing', () => {
        expect(manager.getsd({ test: 'two', nope: false }))
          .to.eql({
                    test: "one",
                    nope: false,
                  });
      });
    });

    context('orGet', () => {
      it('returns config value if value is null or undefined', () => {
        expect(manager.orGet('test', null)).to.eql("one");
      });

      it('returns value if given', () => {
        expect(manager.orGet('test', 1)).to.eql(1);
      });

      it('returns value in non-nil cases', () => {
        expect(manager.orGet('test', false)).to.eql(false);
      });
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
      manager.remove("key", 'keep', 'happ', 'def');
    });

    it('can set single value', () => {
      manager.set('key', 'value');
      expect(manager.get('key')).to.eq('value');
    });

    it('leaves value alone if found', () => {
      expect(manager.getset('key', 'valuered')).to.equal('value');
    });

    it('sets value if not found', () => {
      expect(manager.getset('keep', 'valuered')).to.equal('valuered');
      expect(manager.get('keep')).to.equal('valuered');
    });

    it('can set multiple values from an object', () => {
      const vals = {happ: "instance", def: "jam"};
      manager.sets(vals);

      expect(manager.gets('happ', 'def')).to.eql(vals);
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
