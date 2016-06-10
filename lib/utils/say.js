'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = say;

var _ramda = require('ramda');

var _cliColor = require('cli-color');

var _cliColor2 = _interopRequireDefault(_cliColor);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var printers = {
  error: [console.error, _cliColor2.default.red.bold],
  warn: [console.warn, _cliColor2.default.yellow.italic],
  ok: [console.log, _cliColor2.default.green],
  notice: [console.log, _cliColor2.default.cyan],
  say: [console.log]
};

var colorlessInspector = function colorlessInspector(obj) {
  return (0, _util.inspect)(obj, { colors: false });
};
var doInspect = (0, _ramda.ifElse)((0, _ramda.is)(String), _ramda.identity, colorlessInspector);
var hydrate = function hydrate() {
  for (var _len = arguments.length, msg = Array(_len), _key = 0; _key < _len; _key++) {
    msg[_key] = arguments[_key];
  }

  return (0, _ramda.compose)((0, _ramda.join)(''), (0, _ramda.map)(doInspect))(msg);
};

function say(options) {
  var color = (0, _ramda.pathOr)(true, ['parent', 'color'], options);

  return (0, _ramda.map)(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var printer = _ref2[0];
    var fmt = _ref2[1];

    var boundPrint = printer.bind(console);

    if (!fmt) {
      return boundPrint;
    }

    return color ? (0, _ramda.compose)(boundPrint, fmt, hydrate) : boundPrint;
  }, printers);
}
//# sourceMappingURL=say.js.map