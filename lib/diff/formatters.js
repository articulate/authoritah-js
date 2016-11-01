'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatChange = exports.formatRemove = exports.formatAdd = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _objectDiff = require('./objectDiff');

var _objectDiff2 = _interopRequireDefault(_objectDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isObject = _ramda2.default.compose(_ramda2.default.equals('Object'), _ramda2.default.type);
var isScalar = _ramda2.default.compose(_ramda2.default.not, _ramda2.default.either(isObject, _ramda2.default.isArrayLike), _ramda2.default.last, _ramda2.default.values);

var indentString = "  ";
var formatJSON = _ramda2.default.curry(JSON.stringify)(_ramda2.default.__, null, indentString);
var indent = _ramda2.default.compose(_ramda2.default.join(''), _ramda2.default.times(_ramda2.default.prepend(indentString)));
var _withIndent = function _withIndent(depth, str) {
  return _ramda2.default.concat(indent(depth), str);
};
var withIndent = _ramda2.default.curry(_withIndent);

var formatObject = _ramda2.default.curry(_formatObject);
function _formatObject(symbol, depth) {
  return _ramda2.default.compose(_ramda2.default.join('\n'), _ramda2.default.map(_ramda2.default.compose(_ramda2.default.join(''), _ramda2.default.prepend(symbol), withIndent(depth))), _ramda2.default.split('\n'), formatJSON);
}

var formatAdd = formatObject('+');
var formatRemove = formatObject('-');

var stringifyChange = _ramda2.default.curry(_stringifyChange);
function _stringifyChange(depth, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      add = _ref2[0],
      remove = _ref2[1];

  var buffer = formatRemove(depth)(remove);
  buffer += '\n';
  buffer += formatAdd(depth)(add);

  return buffer;
}

var handleNested = _ramda2.default.curry(function (depth, object, _key) {
  var _R$head = _ramda2.default.head(_ramda2.default.toPairs(object)),
      _R$head2 = _slicedToArray(_R$head, 2),
      key = _R$head2[0],
      line = _R$head2[1];

  var buffer = withIndent(depth, " {\n");
  buffer += formatChangeObject(depth + 1, line, key);
  buffer += withIndent(depth, " }");
  return buffer;
});

var formatFlatChange = _ramda2.default.curry(_formatFlatChange);
function _formatFlatChange(depth, _ref3, key) {
  var _ref4 = _slicedToArray(_ref3, 2),
      add = _ref4[0],
      remove = _ref4[1];

  var buffer = formatRemove(depth)(remove);
  buffer += "\n";
  buffer += formatAdd(depth)(add);

  return buffer;
}

var formatArrayChange = _ramda2.default.curry(_formatArrayChange);
function _formatArrayChange(depth, _ref5, _key) {
  var _ref6 = _slicedToArray(_ref5, 2),
      add = _ref6[0],
      remove = _ref6[1];

  var buffer = withIndent(depth, " [\n");
  buffer += _ramda2.default.map(formatRemove(depth + 1), remove).join(",\n");
  buffer += "\n";
  buffer += _ramda2.default.map(formatAdd(depth + 1), add).join(",\n");
  buffer += "\n";
  buffer += withIndent(depth, " ]");

  return buffer;
}

var formatChangeObject = _ramda2.default.curry(_formatChangeObject);
function _formatChangeObject(depth, line, key) {
  var buffer = withIndent(depth, ' ' + key + ':\n');
  buffer += formatType(line)(depth + 1, line, key);
  buffer += "\n";
  return buffer;
}

var formatType = _ramda2.default.cond([[isScalar, _ramda2.default.always(formatFlatChange)], [_ramda2.default.isArrayLike, _ramda2.default.always(formatArrayChange)], [isObject, _ramda2.default.always(handleNested)]]);

var insertDiff = _ramda2.default.curry(_insertDiff);
function _insertDiff(depth, diff) {
  return _ramda2.default.compose(_ramda2.default.join('\n'), _ramda2.default.values, _ramda2.default.mapObjIndexed(formatChangeObject(depth)), _ramda2.default.apply(_objectDiff2.default))(diff);
}

var formatChange = _ramda2.default.curry(_formatChange);
function _formatChange(depth, changeDef) {
  var _R$head3 = _ramda2.default.head(changeDef),
      name = _R$head3.name;

  var buffer = ' {\n';
  buffer += withIndent(depth + 1, ' name: "' + name + '"\n');
  buffer += insertDiff(depth + 1, changeDef);
  buffer += " }";
  return buffer;
}

exports.formatAdd = formatAdd;
exports.formatRemove = formatRemove;
exports.formatChange = formatChange;