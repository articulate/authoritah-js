'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeClients(context) {
  var client = context.client;
  var removes = context.diff.clients.removes;
  var warn = context.say.warn;


  var print = function print(_ref) {
    var name = _ref.name;
    return warn('Removed client ' + name);
  };
  var removeWrapper = function removeWrapper(cl) {
    return client.clients.delete(_ramda2.default.pick(['client_id'], cl)).then(function (_) {
      return cl;
    });
  };
  var removeClient = _ramda2.default.composeP(print, removeWrapper);

  return Promise.all(_ramda2.default.map(removeClient, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeClients.js.map