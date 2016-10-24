'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareConnectionForUpdate = require('../../transformers/connections/prepareConnectionForUpdate');

var _prepareConnectionForUpdate2 = _interopRequireDefault(_prepareConnectionForUpdate);

var _apiErrorHandler = require('../../utils/apiErrorHandler');

var _apiErrorHandler2 = _interopRequireDefault(_apiErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getId = _ramda2.default.pick(['id']);
function updateConnections(context) {
  var client = context.client;
  var changes = context.diff.connections.changes;
  var notice = context.say.notice;

  var print = function print(_ref) {
    var name = _ref.name;
    return notice("Updated connection: ", name);
  };
  var updateFn = function updateFn(obj) {
    return client.connections.update(getId(obj), (0, _prepareConnectionForUpdate2.default)(obj)).then(print).catch((0, _apiErrorHandler2.default)(obj, "updating connection", context));
  };

  return Promise.all(_ramda2.default.map(updateFn, changes)).then(function (_) {
    return context;
  });
}