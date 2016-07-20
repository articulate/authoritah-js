'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = printDiff;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fromObj = _ramda2.default.flip(_ramda2.default.prop);
var formatJSON = _ramda2.default.curry(JSON.stringify)(_ramda2.default.__, null, "\t");

var symbols = _ramda2.default.flip(_ramda2.default.prop)({
  adds: '+ ',
  removes: '- ',
  changes: '* '
});

var printGroup = _ramda2.default.curry(function (printers, typeDef) {
  var types = _ramda2.default.keys(typeDef);

  _ramda2.default.forEach(function (key) {
    var actions = fromObj(typeDef, key);
    var verbs = _ramda2.default.keys(actions);

    console.log('********* ' + key + ' *********');

    // early exit if no changes found
    if (_ramda2.default.all(_ramda2.default.isEmpty, _ramda2.default.values(actions))) {
      return printers('adds')("No changes!");
    }

    _ramda2.default.forEach(function (actionName) {
      var diffs = fromObj(actions, actionName);
      var printer = printers(actionName);

      _ramda2.default.forEach(_ramda2.default.compose(printer, _ramda2.default.concat(symbols(actionName)), formatJSON), diffs);
    }, verbs);
  }, types);

  console.log(''); // newline between resource groups
});

function printDiff(context) {
  var diff = context.diff;
  var _context$say = context.say;
  var changes = _context$say.notice;
  var adds = _context$say.ok;
  var removes = _context$say.error;

  var types = _ramda2.default.keys(diff);
  var printers = fromObj({ adds: adds, changes: changes, removes: removes });

  _ramda2.default.forEach(_ramda2.default.compose(printGroup(printers), _ramda2.default.flip(_ramda2.default.pick)(diff), _ramda2.default.of), types);

  console.log("Legend: ");
  removes("- Removed");
  changes("* Changed");
  adds("+ Added");

  return context;
}
//# sourceMappingURL=printDiff.js.map