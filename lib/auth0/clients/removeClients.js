'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeClients(context) {
  var removes = context.diff.clients.removes;
  var warn = context.say.warn;

  var removeFn = function removeFn(_ref) {
    var name = _ref.name;
    var id = _ref.id;
    return Promise.resolve(warn('⚠️  Please remove client ' + name + ' (' + id + ') manually!'));
  };

  return Promise.all(_ramda2.default.map(removeFn, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeClients.js.map