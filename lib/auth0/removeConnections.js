'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeConnections(context) {
  var client = context.client;
  var removes = context.diff.connections.removes;
  var warn = context.say.warn;


  var print = function print(_ref) {
    var name = _ref.name;
    return warn('Removed connection ' + name);
  };
  var removeWrapper = function removeWrapper(conn) {
    return client.connections.delete({ id: conn.id }).then(function (_) {
      return conn;
    });
  };
  var removeConnection = _ramda2.default.composeP(print, removeWrapper);

  return Promise.all(_ramda2.default.map(removeConnection, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeConnections.js.map