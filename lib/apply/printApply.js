'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = printDiff;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareRuleForUpdate = require('../transformers/rules/prepareRuleForUpdate');

var _prepareRuleForUpdate2 = _interopRequireDefault(_prepareRuleForUpdate);

var _prepareRuleForSave = require('../transformers/rules/prepareRuleForSave');

var _prepareRuleForSave2 = _interopRequireDefault(_prepareRuleForSave);

var _prepareConnectionForUpdate = require('../transformers/connections/prepareConnectionForUpdate');

var _prepareConnectionForUpdate2 = _interopRequireDefault(_prepareConnectionForUpdate);

var _prepareConnectionForSave = require('../transformers/connections/prepareConnectionForSave');

var _prepareConnectionForSave2 = _interopRequireDefault(_prepareConnectionForSave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fromObj = _ramda2.default.flip(_ramda2.default.prop);
var formatJSON = _ramda2.default.curry(JSON.stringify)(_ramda2.default.__, null, "\t");

var symbols = _ramda2.default.flip(_ramda2.default.prop)({
  adds: '+ ',
  removes: '- ',
  changes: '* '
});

var formatters = function formatters() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return _ramda2.default.path(args)({
    rules: { adds: _prepareRuleForSave2.default, changes: _prepareRuleForUpdate2.default, removes: _ramda2.default.prop('name') },
    connections: { adds: _prepareConnectionForSave2.default, changes: _prepareConnectionForUpdate2.default, removes: _ramda2.default.prop('name') }
  });
};

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
      var formatter = formatters(key, actionName);

      _ramda2.default.forEach(_ramda2.default.compose(printer, _ramda2.default.concat(symbols(actionName)), formatJSON, formatter), diffs);
    }, verbs);
  }, types);

  console.log(''); // newline between resource groups
});

function printDiff(context) {
  var diff = context.diff,
      _context$say = context.say,
      changes = _context$say.notice,
      adds = _context$say.ok,
      removes = _context$say.error;

  var types = _ramda2.default.keys(diff);
  var printers = fromObj({ adds: adds, changes: changes, removes: removes });

  _ramda2.default.forEach(_ramda2.default.compose(printGroup(printers), _ramda2.default.flip(_ramda2.default.pick)(diff), _ramda2.default.of), types);

  console.log("Legend: ");
  removes("- Removed");
  changes("* Changed");
  adds("+ Added");

  return context;
}