import R from 'ramda'
import { formatAdd, formatRemove, formatChange } from '../../src/diff/formatters'

describe("diff formatters", () => {
  context('for adds', () => {
    const add = {
      one: 1,
      two: 2
    };

    it("should format with the common diff add", () => {
      expect(formatAdd(0)(add)).to.equal(`+{
+  "one": 1,
+  "two": 2
+}`);
    });

    it("can indent to a given level", () => {
      expect(formatAdd(2)(add)).to.equal(`+    {
+      "one": 1,
+      "two": 2
+    }`);
    });
  });

  context('for removes', () => {
    const remove = {
      three: 3,
      four: {
        five: [6,7]
      }
    };

    it("should format with the common diff remove", () => {
      expect(formatRemove(0)(remove)).to.equal(`-{
-  "three": 3,
-  "four": {
-    "five": [
-      6,
-      7
-    ]
-  }
-}`);
    });
  });

  context('for changes', () => {
    const changeFixture = R.map(R.merge({name: 'change'}));

    it("can handle changes to flat values", () => {
      const flat = changeFixture([{ one: 1 }, { one: 2 }]);

      expect(formatChange(0)(flat)).to.equal(` {
   name: "change"
   one:
-    2
+    1
 }`);
    });

    it("can handle changes to array values", () => {
      const array = changeFixture([{ two: [3,4] }, { two: [4,5] }]);

      expect(formatChange(0)(array)).to.equal(` {
   name: "change"
   two:
     [
-      4,
-      5
+      3,
+      4
     ]
 }`);
    });

    it("can handle changes to object values", () => {
      const obj = changeFixture([
        { three: { four: 'more', five: 'changes' } },
        { three: { four: 'more', five: 'others' } }
      ]);

      expect(formatChange(0)(obj)).to.equal(` {
   name: "change"
   three:
     {
       five:
-        "others"
+        "changes"
     }
 }`);
    });

  });
});
