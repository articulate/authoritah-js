'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _apiCallWrapper = require('../../utils/apiCallWrapper');

var _apiCallWrapper2 = _interopRequireDefault(_apiCallWrapper);

var _prepareRuleForCreate = require('../../transformers/rules/prepareRuleForCreate');

var _prepareRuleForCreate2 = _interopRequireDefault(_prepareRuleForCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addRules(context) {
  var adds = context.diff.rules.adds;

  var createFn = (0, _apiCallWrapper2.default)("rules.create", context);
  var addRule = _ramda2.default.compose(createFn, _prepareRuleForCreate2.default);

  return Promise.all(_ramda2.default.map(addRule, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addRules.js.map