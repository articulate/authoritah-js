'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = insertClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupByUuid = _ramda2.default.compose(_ramda2.default.groupBy(_ramda2.default.prop('name')), _ramda2.default.concat);
var pairNotEqual = _ramda2.default.apply(_ramda2.default.complement(_ramda2.default.eqProps('uuid')));
var missingIds = _ramda2.default.compose(_ramda2.default.not, _ramda2.default.isNil, _ramda2.default.prop('client_id'));

function insertClients(context) {
  var server = context.clients;
  var local = context.manifest.clients;


  var filtered = _ramda2.default.compose(_ramda2.default.filter(missingIds), _ramda2.default.values, _ramda2.default.map(_ramda2.default.mergeAll), _ramda2.default.filter(pairNotEqual), groupByUuid)(server, local);

  return _ramda2.default.assocPath(['diff', 'clients', 'changes'], filtered, context);
}
//# sourceMappingURL=insertClients.js.map