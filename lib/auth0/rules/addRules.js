'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareRule = require('./prepareRule');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addRules(context) {
  var client = context.client;
  var adds = context.diff.rules.adds;
  var ok = context.say.ok;


  var print = function print(_ref) {
    var name = _ref.name;
    return ok('Added rule ', name);
  };
  var addRule = _ramda2.default.compose(_ramda2.default.composeP(print, client.rules.create), _prepareRule.prepareForCreate);

  return Promise.all(_ramda2.default.map(addRule, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addRules.js.map