'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _apiCallWrapper = require('../../utils/apiCallWrapper');

var _apiCallWrapper2 = _interopRequireDefault(_apiCallWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeClients(context) {
  var removes = context.diff.clients.removes;

  var removeFn = (0, _apiCallWrapper2.default)('clients.delete', context);

  return Promise.all(_ramda2.default.map(removeFn, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeClients.js.map