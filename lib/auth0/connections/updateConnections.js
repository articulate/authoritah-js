'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareConnection = require('./prepareConnection');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateConnections(context) {
  var client = context.client;
  var changes = context.diff.connections.changes;
  var notice = context.say.notice;


  var print = function print(_ref) {
    var name = _ref.name;
    return notice('Updated connection ', name);
  };
  var updateWrapper = function updateWrapper(connection) {
    return client.connections.update(_ramda2.default.pick(['id'], connection), (0, _prepareConnection.prepareForUpdate)(connection));
  };
  var updateConnection = _ramda2.default.composeP(print, updateWrapper);

  return Promise.all(_ramda2.default.map(updateConnection, changes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=updateConnections.js.map