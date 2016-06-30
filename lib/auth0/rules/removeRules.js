'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeRules(context) {
  var client = context.client;
  var removes = context.diff.rules.removes;
  var warn = context.say.warn;


  var print = function print(_ref) {
    var name = _ref.name;
    return warn('Removed rule ' + name);
  };
  var removeWrapper = function removeWrapper(rule) {
    return client.rules.delete(rule.id).then(function (_) {
      return rule;
    });
  };
  var removeRule = _ramda2.default.composeP(print, removeWrapper);

  return Promise.all(_ramda2.default.map(removeRule, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeRules.js.map