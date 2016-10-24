import R from 'ramda'
import objectDiff from './objectDiff'

const isObject = R.compose(R.equals('Object'), R.type);
const isScalar = R.compose(R.not, R.either(isObject, R.isArrayLike), R.last, R.values);

const indentString = "  ";
const formatJSON = R.curry(JSON.stringify)(R.__, null, indentString);
const indent = R.compose(R.join(''), R.times(R.prepend(indentString)));
const _withIndent = (depth, str) => R.concat(indent(depth), str);
const withIndent = R.curry(_withIndent);

const formatObject = R.curry(_formatObject);
function _formatObject(symbol, depth) {
  return R.compose(
    R.join('\n'),
    R.map(R.compose(
      R.join(''),
      R.prepend(symbol),
      withIndent(depth)
    )),
    R.split('\n'),
    formatJSON);
}

const formatAdd = formatObject('+');
const formatRemove = formatObject('-');

const stringifyChange = R.curry(_stringifyChange);
function _stringifyChange(depth, [add, remove]) {
  var buffer = formatRemove(depth)(remove);
  buffer += '\n';
  buffer += formatAdd(depth)(add);

  return buffer;
}

const handleNested = R.curry((depth, object, _key) => {
  const [key, line] = R.head(R.toPairs(object));
  var buffer = withIndent(depth, " {\n");
  buffer += formatChangeObject(depth+1, line, key);
  buffer += withIndent(depth, " }");
  return buffer;
});

const formatFlatChange = R.curry(_formatFlatChange);
function _formatFlatChange(depth, [add, remove], key) {
  var buffer = formatRemove(depth)(remove);
  buffer += "\n";
  buffer += formatAdd(depth)(add);

  return buffer;
}

const formatArrayChange = R.curry(_formatArrayChange);
function _formatArrayChange(depth, [add, remove], _key) {
  var buffer = withIndent(depth, " [\n");
  buffer += R.map(formatRemove(depth+1), remove).join(",\n");
  buffer += "\n";
  buffer += R.map(formatAdd(depth+1), add).join(",\n");
  buffer += "\n";
  buffer += withIndent(depth, " ]");

  return buffer;
}

const formatChangeObject = R.curry(_formatChangeObject);
function _formatChangeObject(depth, line, key) {
  var buffer = withIndent(depth, ` ${key}:\n`);
  buffer += formatType(line)(depth+1, line, key);
  buffer += "\n";
  return buffer;
}

const formatType = R.cond([
  [isScalar, R.always(formatFlatChange)],
  [R.isArrayLike, R.always(formatArrayChange)],
  [isObject, R.always(handleNested)]
]);


const insertDiff = R.curry(_insertDiff);
function _insertDiff(depth, diff) {
  return R.compose(
    R.join('\n'),
    R.values,
    R.mapObjIndexed(formatChangeObject(depth)),
    R.apply(objectDiff)
  )(diff);
}

const formatChange = R.curry(_formatChange);
function _formatChange(depth, changeDef) {
  const { name } = R.head(changeDef);

  var buffer = ' {\n';
  buffer += withIndent(depth+1, ` name: "${name}"\n`);
  buffer += insertDiff(depth+1, changeDef);
  buffer += " }";
  return buffer;
}

export { formatAdd, formatRemove, formatChange };
