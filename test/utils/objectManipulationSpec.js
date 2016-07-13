import R from 'ramda'
import { expandObject, combineObject } from '../../src/transformers/objectManipulation'

describe("object manipulation utils", () => {
  const obj = { logo: 'magic', basic: 'test' };
  const arr = [
    { name: 'logo', script: 'magic' },
    { name: 'basic', script: 'test' },
  ];


  context('expandObject', () => {
    const expander = expandObject('name', 'script');
    it('will extract key/value pairs into named values', () => {
      expect(expander(obj)).to.eql(arr)
    });
  });

  context('combineObject', () => {
    const combiner = combineObject('name', 'script');

    it('should combine an array of name, key/value objects', () => {
      expect(combiner(arr)).to.eql(obj)
    });
  });
});
