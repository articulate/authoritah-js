import R from 'ramda'
import changes from '../../../src/diff/detectors/changes'

const local = [
  {
    name: '1234',
    attr: 2,
    bobby: "tables",
    fake: { once: 1 },
    empty: [],
    hashpty: {},
    doubler: [1, 2]
  },
  { name: '999', attr: 1, same: "tbh" },
  { name: '77910', attr: 2 },
];

const server = [
  {
    name: '1234',
    attr: 1,
    bubble: "bath",
    fake: { twice: 2 },
    empty: [1, 2, 3],
    hashpty: { one: 'once' },
    dingo: { one: 2 },
    doubler: [1, 2]
  },
  { name: '999', attr: 1, same: "for real" },
  { name: '3456', attr: 2 },
];

const filter = R.pick(['attr']);

describe("diffing for changes", () => {
  const result = changes(filter)(local, server);
  const [lhs, rhs] = result[0];
  const splits = { left: [lhs, local[0]], right: [rhs, server[0]] };

  it('returns only filtered fields changed', () => {
    expect(result.length).to.eq(1);
  });

  it('merges details from both', () => {
    expect(rhs).to.have.all.keys(...R.keys(lhs));
  });

  R.mapObjIndexed(([result, cfg], side) => {
    context(`${side} side`, () => {
      it(`uses ${side} value for conflicts`, () => {
        expect(result.attr).to.equal(cfg.attr);
      });

      it('merges deeply from both', () => {
        expect(result.fake).to.eql({ once: 1, twice: 2 })
      });

      it('dedups arrays with duplicate items', () => {
        expect(result.doubler).to.eql([1, 2])
      });

      it('merges when missing entirely', () => {
        expect(result.dingo).to.eql({ one: 2 });
      });

      context('empty', () => {
        it('does not merge array', () => {
          expect(result.empty).to.eql(cfg.empty);
        });

        it('does not merge hash', () => {
          expect(result.hashpty).to.eql(cfg.hashpty);
        });

      });
    })
  })(splits);
});
