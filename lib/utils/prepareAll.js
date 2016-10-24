'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = prepareAll;

var _loadEnv = require('../utils/loadEnv');

var _loadEnv2 = _interopRequireDefault(_loadEnv);

var _loadManifest = require('../apply/loadManifest');

var _loadManifest2 = _interopRequireDefault(_loadManifest);

var _setupClient = require('../utils/setupClient');

var _setupClient2 = _interopRequireDefault(_setupClient);

var _fetchRules = require('../auth0/rules/fetchRules');

var _fetchRules2 = _interopRequireDefault(_fetchRules);

var _fetchConnections = require('../auth0/connections/fetchConnections');

var _fetchConnections2 = _interopRequireDefault(_fetchConnections);

var _fetchClients = require('../auth0/clients/fetchClients');

var _fetchClients2 = _interopRequireDefault(_fetchClients);

var _disassociate = require('./clientConnections/disassociate');

var _disassociate2 = _interopRequireDefault(_disassociate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function prepareAll(filename, options) {
  return (0, _loadEnv2.default)(options).then((0, _loadManifest2.default)(filename)).then(_setupClient2.default).then(_fetchRules2.default).then(_fetchConnections2.default).then(_fetchClients2.default).then(_disassociate2.default);
}