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


  var print = function print(id) {
    return warn('Removed connection ' + id);
  };
  var remove = function remove(id) {
    client.connections.delete({ id: id });
    return id;
  };
  var removeConnection = _ramda2.default.compose(print, remove, _ramda2.default.prop('id'));

  return Promise.all(_ramda2.default.map(removeConnection, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeConnections.js.map