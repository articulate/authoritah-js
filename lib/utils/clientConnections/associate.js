'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = associate;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _findAllIn = require('../findAllIn');

var _findAllIn2 = _interopRequireDefault(_findAllIn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function associate(context) {
  var clients = context.clients;

  var retrieveIds = _ramda2.default.compose(_ramda2.default.pluck('name'), (0, _findAllIn2.default)(clients, 'client_id'));
  var associateClient = _ramda2.default.ifElse(_ramda2.default.has('enabled_clients'), _ramda2.default.over(_ramda2.default.lensProp('enabled_clients'), retrieveIds), _ramda2.default.identity);

  return _ramda2.default.over(_ramda2.default.lensProp('connections'), _ramda2.default.map(associateClient), context);
}