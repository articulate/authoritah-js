'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _apiErrorHandler = require('../../utils/apiErrorHandler');

var _apiErrorHandler2 = _interopRequireDefault(_apiErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addConnections(context) {
  var client = context.client;
  var adds = context.diff.connections.adds;
  var ok = context.say.ok;

  var print = function print(_ref) {
    var name = _ref.name;
    return ok("Created connection: ", name);
  };
  var createFn = function createFn(obj) {
    return client.connections.create(obj).then(print).catch((0, _apiErrorHandler2.default)("creating connection", obj, context));
  };

  return Promise.all(_ramda2.default.map(createFn, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addConnections.js.map