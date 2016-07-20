'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _apiCallWrapper = require('../../utils/apiCallWrapper');

var _apiCallWrapper2 = _interopRequireDefault(_apiCallWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeConnections(context) {
  var removes = context.diff.connections.removes;

  var removeFn = (0, _apiCallWrapper2.default)('connections.delete', context);

  return Promise.all(_ramda2.default.map(removeFn, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeConnections.js.map