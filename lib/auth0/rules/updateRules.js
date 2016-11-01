'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareRuleForUpdate = require('../../transformers/rules/prepareRuleForUpdate');

var _prepareRuleForUpdate2 = _interopRequireDefault(_prepareRuleForUpdate);

var _apiErrorHandler = require('../../utils/apiErrorHandler');

var _apiErrorHandler2 = _interopRequireDefault(_apiErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getId = _ramda2.default.compose(_ramda2.default.pick(['id']), _ramda2.default.head);
function updateRules(context) {
  var client = context.client,
      changes = context.diff.rules.changes,
      notice = context.say.notice;

  var print = function print(_ref) {
    var name = _ref.name;
    return notice("Updated rule: ", name);
  };
  var updateFn = function updateFn(obj) {
    return client.rules.update(getId(obj), (0, _prepareRuleForUpdate2.default)(obj)).then(print).catch((0, _apiErrorHandler2.default)(obj, "updating rule", context));
  };

  return Promise.all(_ramda2.default.map(updateFn, changes)).then(function (_) {
    return context;
  });
}