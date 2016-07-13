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
  var client = context.client;
  var changes = context.diff.rules.changes;
  var notice = context.say.notice;

  var updateFn = (0, _apiCallWrapper2.default)(client.rules.update, context);

  var print = function print(_ref) {
    var name = _ref.name;
    return notice('Updated rule ', name);
  };
  var updateWrapper = function updateWrapper(rule) {
    return updateFn({ id: rule.id }, (0, _prepareRuleForUpdate2.default)(rule));
  };
  var updateRule = _ramda2.default.composeP(print, updateWrapper);

  return Promise.all(_ramda2.default.map(updateRule, changes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=updateRules.js.map