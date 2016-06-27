'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareRule = require('./prepareRule');

var _prepareRule2 = _interopRequireDefault(_prepareRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addRules(context) {
  var client = context.client;
  var adds = context.diff.rules.adds;
  var ok = context.say.ok;


  var print = function print(id) {
    return ok('Added rule ', id);
  };
  var addRule = _ramda2.default.compose(_ramda2.default.composeP(print, _ramda2.default.prop('id'), client.rules.create), (0, _prepareRule2.default)('create'));

  return Promise.all(_ramda2.default.map(addRule, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addRules.js.map