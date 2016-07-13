'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareClientForDiff = require('../../transformers/clients/prepareClientForDiff');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addClients(context) {
  var client = context.client;
  var adds = context.diff.clients.adds;
  var ok = context.say.ok;


  var print = function print(_ref) {
    var name = _ref.name;
    return ok('Added client ', name);
  };
  var addClient = _ramda2.default.composeP(print, _ramda2.default.compose(client.clients.create, _prepareClientForDiff.prepareClient));

  return Promise.all(_ramda2.default.map(addClient, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addClients.js.map