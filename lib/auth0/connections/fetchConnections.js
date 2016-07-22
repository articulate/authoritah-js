'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchRules(context) {
  var client = context.client;


  return client.connections.getAll().then(_ramda2.default.assoc('connections', _ramda2.default.__, context));
}
//# sourceMappingURL=fetchConnections.js.map