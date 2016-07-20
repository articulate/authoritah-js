'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareClientForDiff = require('../../transformers/clients/prepareClientForDiff');

var _prepareClientForDiff2 = _interopRequireDefault(_prepareClientForDiff);

var _apiErrorHandler = require('../../utils/apiErrorHandler');

var _apiErrorHandler2 = _interopRequireDefault(_apiErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addClients(context) {
  var client = context.client;
  var adds = context.diff.clients.adds;
  var ok = context.say.ok;

  var print = function print(_ref) {
    var name = _ref.name;
    return ok("Created client: ", name);
  };
  var createFn = function createFn(obj) {
    return client.clients.create((0, _prepareClientForDiff2.default)(obj)).then(print).catch((0, _apiErrorHandler2.default)("creating client", obj, context));
  };

  return Promise.all(_ramda2.default.map(createFn, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addClients.js.map