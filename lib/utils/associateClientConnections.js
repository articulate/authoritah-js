'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.associate = associate;
exports.disassociate = disassociate;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function findAllIn(collection, key) {
  return function (ids) {
    return _ramda2.default.filter(_ramda2.default.compose(_ramda2.default.flip(_ramda2.default.contains)(ids), _ramda2.default.prop(key)), collection);
  };
}

function associate(context) {
  var clients = context.clients;

  var retrieveIds = _ramda2.default.compose(_ramda2.default.pluck('uuid'), findAllIn(clients, 'client_id'));
  var associateClient = _ramda2.default.over(_ramda2.default.lensProp('enabled_clients'), retrieveIds);

  return _ramda2.default.over(_ramda2.default.lensProp('connections'), _ramda2.default.map(associateClient), context);
}

function disassociate(context) {
  var clients = context.clients;

  var retrieveIds = _ramda2.default.compose(_ramda2.default.pluck('client_id'), findAllIn(clients, 'uuid'));
  var associateClient = _ramda2.default.over(_ramda2.default.lensProp('enabled_clients'), retrieveIds);

  return _ramda2.default.over(_ramda2.default.lensPath(['manifest', 'connections']), _ramda2.default.map(associateClient), context);
}
//# sourceMappingURL=associateClientConnections.js.map