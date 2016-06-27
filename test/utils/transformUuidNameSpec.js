import { extractUuid, combineUuid } from '../../src/utils/transformUuidName'

describe("transformations on UUID name", () => {
  context('extraction', () => {
    it('can extract uuid from a combined uuid name', () => {
      const result = extractUuid({name: "EBF20416-414D-42F8-8766-3524F944C28F Name With Face"});

      expect(result).to.eql({name: "Name With Face", uuid: "EBF20416-414D-42F8-8766-3524F944C28F" });
    });

    it('creates UUID if no UUID found', () => {
      const result = extractUuid({name: "Name With Face"});

      expect(result.name).to.eql("Name With Face");
      expect(result.uuid).to.not.be.undefined;
    });
  });

  context('combination', () => {
    it('can combine a UUID and name', () => {
      const result = combineUuid({uuid: "1234", name: "Hello World"});

      expect(result).to.eql({name: "1234 Hello World"});
    });

    it('can generate a uuid if none given', () => {
      const result = combineUuid({name: "Hello World"});

      expect(result.name).to.match(/([\w]{8}(?:-[\w]{4}){3}-[\w]{12}) Hello World/);
    });
  });
});
