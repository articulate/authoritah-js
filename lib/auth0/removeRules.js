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


  var print = function print(id) {
    return warn('Removed rule ' + id);
  };
  var remove = function remove(id) {
    client.rules.delete({ id: id });
    return id;
  };

  var removeRule = _ramda2.default.compose(print, remove, _ramda2.default.prop('id'));

  return Promise.all(_ramda2.default.map(removeRule, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeRules.js.map