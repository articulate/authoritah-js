'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareClientForDiff = require('../../transformers/clients/prepareClientForDiff');

var _apiCallWrapper = require('../../utils/apiCallWrapper');

var _apiCallWrapper2 = _interopRequireDefault(_apiCallWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addClients(context) {
  var adds = context.diff.clients.adds;

  var createFn = (0, _apiCallWrapper2.default)("clients.create", context);
  var addClient = _ramda2.default.compose(createFn, _prepareClientForDiff.prepareClient);

  return Promise.all(_ramda2.default.map(addClient, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addClients.js.map