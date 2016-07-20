'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _apiErrorHandler = require('../../utils/apiErrorHandler');

var _apiErrorHandler2 = _interopRequireDefault(_apiErrorHandler);

var _prepareRuleForCreate = require('../../transformers/rules/prepareRuleForCreate');

var _prepareRuleForCreate2 = _interopRequireDefault(_prepareRuleForCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addRules(context) {
  var client = context.client;
  var adds = context.diff.rules.adds;
  var ok = context.say.ok;

  var print = function print(_ref) {
    var name = _ref.name;
    return ok("Created rule: ", name);
  };
  var removeFn = function removeFn(obj) {
    return client.rules.create((0, _prepareRuleForCreate2.default)(obj)).then(print).catch((0, _apiErrorHandler2.default)("creating rule", obj, context));
  };

  return Promise.all(_ramda2.default.map(removeFn, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addRules.js.map