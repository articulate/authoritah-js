'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _parseConnection = require('../../transformers/connections/parseConnection');

var _parseConnection2 = _interopRequireDefault(_parseConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchRules(context) {
  var client = context.client;


  return client.connections.getAll().then(_ramda2.default.assoc('connections', _ramda2.default.__, context)).then(_parseConnection2.default);
}
//# sourceMappingURL=fetchConnections.js.map