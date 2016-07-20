'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _apiErrorHandler = require('../../utils/apiErrorHandler');

var _apiErrorHandler2 = _interopRequireDefault(_apiErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeConnections(context) {
  var client = context.client;
  var removes = context.diff.connections.removes;
  var warn = context.say.warn;

  var print = function print(_ref) {
    var name = _ref.name;
    return warn("Removed connection: ", name);
  };
  var removeFn = function removeFn(obj) {
    return client.connections.delete(_ramda2.default.pick(['id'], obj)).then(function (_) {
      return print(obj);
    }).catch((0, _apiErrorHandler2.default)(obj, 'removing connection', context));
  };

  return Promise.all(_ramda2.default.map(removeFn, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeConnections.js.map