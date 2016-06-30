'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = associateClientConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function associateClientConnections(context) {
  var clients = context.clients;

  var findClients = function findClients(ids) {
    return _ramda2.default.filter(_ramda2.default.compose(_ramda2.default.flip(_ramda2.default.contains)(ids), _ramda2.default.prop('client_id')), clients);
  };
  var retrieveIds = _ramda2.default.compose(_ramda2.default.pluck('uuid'), findClients);
  var associateClient = _ramda2.default.over(_ramda2.default.lensProp('enabled_clients'), retrieveIds);

  return _ramda2.default.over(_ramda2.default.lensProp('connections'), _ramda2.default.map(associateClient), context);
}
//# sourceMappingURL=associateClientConnections.js.map