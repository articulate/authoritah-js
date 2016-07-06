'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = updateClients;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareClient = require('./prepareClient');

var _prepareClient2 = _interopRequireDefault(_prepareClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function updateClients(context) {
  var client = context.client;
  var changes = context.diff.clients.changes;
  var notice = context.say.notice;


  var print = function print(_ref) {
    var name = _ref.name;
    return notice('Updated client ', name);
  };
  var updateWrapper = function updateWrapper(cl) {
    return client.clients.update(_ramda2.default.pick(['client_id'], cl), (0, _prepareClient2.default)(cl));
  };
  var updateClient = _ramda2.default.composeP(print, updateWrapper);

  return Promise.all(_ramda2.default.map(updateClient, changes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=updateClients.js.map