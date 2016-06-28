'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (context) {
  var diff = context.diff;

  var applier = _ramda2.default.partial(parallelizer, [context]);

  var promises = _ramda2.default.map(_ramda2.default.compose(applier, getActions), _ramda2.default.keys(diff));

  return Promise.all(promises).then(function (_) {
    return context;
  });
};

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _addRules = require('../auth0/addRules');

var _addRules2 = _interopRequireDefault(_addRules);

var _updateRules = require('../auth0/updateRules');

var _updateRules2 = _interopRequireDefault(_updateRules);

var _removeRules = require('../auth0/removeRules');

var _removeRules2 = _interopRequireDefault(_removeRules);

var _addConnections = require('../auth0/addConnections');

var _addConnections2 = _interopRequireDefault(_addConnections);

var _updateConnections = require('../auth0/updateConnections');

var _updateConnections2 = _interopRequireDefault(_updateConnections);

var _removeConnections = require('../auth0/removeConnections');

var _removeConnections2 = _interopRequireDefault(_removeConnections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getActions = _ramda2.default.flip(_ramda2.default.prop)({
  rules: [_addRules2.default, _updateRules2.default, _removeRules2.default],
  connections: [_addConnections2.default, _updateConnections2.default, _removeConnections2.default]
});

function parallelizer(context, functions) {
  return Promise.all(_ramda2.default.map(function (fn) {
    return fn(context);
  }, functions));
}
//# sourceMappingURL=applyDiff.js.map