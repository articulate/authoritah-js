'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareConnectionForCreate = require('../../transformers/connections/prepareConnectionForCreate');

var _prepareConnectionForCreate2 = _interopRequireDefault(_prepareConnectionForCreate);

var _apiCallWrapper = require('../../utils/apiCallWrapper');

var _apiCallWrapper2 = _interopRequireDefault(_apiCallWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addConnections(context) {
  var adds = context.diff.connections.adds;

  var addFn = (0, _apiCallWrapper2.default)('connections.create', context);
  var addConnection = _ramda2.default.compose(addFn, _prepareConnectionForCreate2.default);

  return Promise.all(_ramda2.default.map(addConnection, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addConnections.js.map