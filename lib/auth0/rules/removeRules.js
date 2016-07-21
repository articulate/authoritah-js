'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeRules(context) {
  var removes = context.diff.rules.removes;
  var warn = context.say.warn;

  var removeFn = function removeFn(_ref) {
    var name = _ref.name;
    var id = _ref.id;
    return Promise.resolve(warn('⚠️  Please remove rule ' + name + ' (' + id + ') manually!'));
  };

  return Promise.all(_ramda2.default.map(removeFn, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeRules.js.map