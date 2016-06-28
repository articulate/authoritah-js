'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareConnection = require('./prepareConnection');

var _prepareConnection2 = _interopRequireDefault(_prepareConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addConnections(context) {
  var client = context.client;
  var adds = context.diff.connections.adds;
  var _context$say = context.say;
  var ok = _context$say.ok;
  var error = _context$say.error;


  var print = function print(_ref) {
    var id = _ref.name;
    return ok('Added connection ', id);
  };
  var addConnection = _ramda2.default.compose(_ramda2.default.composeP(print, client.connections.create), (0, _prepareConnection2.default)('create'));

  return Promise.all(_ramda2.default.map(addConnection, adds)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=addConnections.js.map