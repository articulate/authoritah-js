'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareRuleForDiff = require('../transformers/rules/prepareRuleForDiff');

var _prepareRuleForDiff2 = _interopRequireDefault(_prepareRuleForDiff);

var _prepareConnectionForDiff = require('../transformers/connections/prepareConnectionForDiff');

var _prepareConnectionForDiff2 = _interopRequireDefault(_prepareConnectionForDiff);

var _additions = require('./detectors/additions');

var _additions2 = _interopRequireDefault(_additions);

var _removals = require('./detectors/removals');

var _removals2 = _interopRequireDefault(_removals);

var _changes = require('./detectors/changes');

var _changes2 = _interopRequireDefault(_changes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var COMPARE_FIELDS = {
  rules: _prepareRuleForDiff2.default,
  connections: _prepareConnectionForDiff2.default
};

var INVALID_RULE_STAGES = ['user_registration', 'user_blocked'];

var ruleStageCheck = function ruleStageCheck(rule) {
  return _ramda2.default.any(_ramda2.default.equals(_ramda2.default.prop('stage', rule)), INVALID_RULE_STAGES);
};

// if any invalid stage rules are listed for add, move them to updates
function specialRuleCase(diff) {
  var adds = diff.adds,
      changes = diff.changes;

  var invalidStageRules = _ramda2.default.map(function (val) {
    return _ramda2.default.repeat(val, 2);
  }, _ramda2.default.filter(ruleStageCheck, adds));
  var cleanAdds = _ramda2.default.reject(ruleStageCheck, adds);

  return _ramda2.default.compose(_ramda2.default.assoc('changes', _ramda2.default.concat(changes, invalidStageRules)), _ramda2.default.assoc('adds', cleanAdds))(diff);
}

function diff(field, context) {
  var local = context.manifest[field],
      server = context[field],
      ok = context.say.ok;

  var filter = COMPARE_FIELDS[field];

  var diff = {
    changes: (0, _changes2.default)(filter)(local, server),
    removes: (0, _removals2.default)(local, server),
    adds: (0, _additions2.default)(local, server)
  };

  if (field === 'rules') {
    diff = specialRuleCase(diff);
  }

  if (_ramda2.default.all(_ramda2.default.isEmpty, _ramda2.default.values(diff))) {
    ok('No changes to apply for ' + field + '!');
  }
  return _ramda2.default.assocPath(['diff', field], diff, context);
}

exports.default = _ramda2.default.curry(diff);