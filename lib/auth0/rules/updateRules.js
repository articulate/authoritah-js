'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareRuleForUpdate = require('../../transformers/rules/prepareRuleForUpdate');

var _prepareRuleForUpdate2 = _interopRequireDefault(_prepareRuleForUpdate);

var _apiCallWrapper = require('../../utils/apiCallWrapper');

var _apiCallWrapper2 = _interopRequireDefault(_apiCallWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateRules(context) {
  var changes = context.diff.rules.changes;

  var updateFn = (0, _apiCallWrapper2.default)("rules.update", context);
  var updateRule = _ramda2.default.compose(updateFn, _prepareRuleForUpdate2.default);

  return Promise.all(_ramda2.default.map(updateRule, changes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=updateRules.js.map