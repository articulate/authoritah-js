'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareClientForUpdate = require('../../transformers/clients/prepareClientForUpdate');

var _prepareClientForUpdate2 = _interopRequireDefault(_prepareClientForUpdate);

var _apiErrorHandler = require('../../utils/apiErrorHandler');

var _apiErrorHandler2 = _interopRequireDefault(_apiErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getId = _ramda2.default.pick(['client_id']);
function updateClients(context) {
  var client = context.client;
  var changes = context.diff.clients.changes;
  var notice = context.say.notice;

  var print = function print(_ref) {
    var name = _ref.name;
    return notice("Updated client: ", name);
  };
  var updateFn = function updateFn(obj) {
    return client.clients.update(getId(obj), (0, _prepareClientForUpdate2.default)(obj)).then(print).catch((0, _apiErrorHandler2.default)(obj, "updating client", context));
  };

  return Promise.all(_ramda2.default.map(updateFn, changes)).then(function (_) {
    return context;
  });
}