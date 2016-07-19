'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareConnectionForUpdate = require('../../transformers/connections/prepareConnectionForUpdate');

var _prepareConnectionForUpdate2 = _interopRequireDefault(_prepareConnectionForUpdate);

var _apiCallWrapper = require('../../utils/apiCallWrapper');

var _apiCallWrapper2 = _interopRequireDefault(_apiCallWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateConnections(context) {
  var changes = context.diff.connections.changes;

  var updateFn = (0, _apiCallWrapper2.default)("connections.update", context);
  var updateConnection = _ramda2.default.compose(updateFn, _prepareConnectionForUpdate2.default);

  return Promise.all(_ramda2.default.map(updateConnection, changes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=updateConnections.js.map