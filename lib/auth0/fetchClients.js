'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _parseClients = require('./parsers/parseClients');

var _parseClients2 = _interopRequireDefault(_parseClients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fetchClients(context) {
  var client = context.client;


  return client.clients.getAll().then(_ramda2.default.assoc('clients', _ramda2.default.__, context)).then(_parseClients2.default);
}
//# sourceMappingURL=fetchClients.js.map