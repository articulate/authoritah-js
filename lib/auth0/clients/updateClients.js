'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareClientForUpdate = require('../../transformers/clients/prepareClientForUpdate');

var _prepareClientForUpdate2 = _interopRequireDefault(_prepareClientForUpdate);

var _apiCallWrapper = require('../../utils/apiCallWrapper');

var _apiCallWrapper2 = _interopRequireDefault(_apiCallWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateClients(context) {
  var changes = context.diff.clients.changes;

  var updateFn = (0, _apiCallWrapper2.default)("clients.update", context);
  var updateClient = _ramda2.default.compose(updateFn, _prepareClientForUpdate2.default);

  return Promise.all(_ramda2.default.map(updateClient, changes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=updateClients.js.map