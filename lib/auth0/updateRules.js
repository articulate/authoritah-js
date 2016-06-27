'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareRule = require('./prepareRule');

var _prepareRule2 = _interopRequireDefault(_prepareRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateRules(context) {
  var client = context.client;
  var changes = context.diff.rules.changes;
  var notice = context.say.notice;


  var print = function print(id) {
    return notice('Updated rule ', id);
  };
  var update = function update(rule) {
    return client.rules.update(_ramda2.default.pick(['id'], rule), (0, _prepareRule2.default)('update')(rule));
  };
  var updateRule = _ramda2.default.composeP(print, _ramda2.default.prop('id'), update);

  return Promise.all(_ramda2.default.map(updateRule, changes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=updateRules.js.map