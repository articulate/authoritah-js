'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareConnection = require('./prepareConnection');

var _prepareConnection2 = _interopRequireDefault(_prepareConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateConnections(context) {
  var client = context.client;
  var changes = context.diff.connections.changes;
  var notice = context.say.notice;


  var print = function print(id) {
    return notice('Updated connection ', id);
  };
  var update = function update(connection) {
    return client.connections.update(_ramda2.default.pick(['id'], connection), (0, _prepareConnection2.default)(connection));
  };
  var updateConnection = _ramda2.default.composeP(print, _ramda2.default.prop('id'), update);

  return Promise.all(_ramda2.default.map(updateConnection, changes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=updateConnections.js.map