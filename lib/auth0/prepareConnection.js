'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFields = _ramda2.default.pick(['options', 'name', 'strategy', 'enabled_clients']);
var filterForUpdate = _ramda2.default.pick(['options', 'enabled_clients']);

function joinNameWhitespace(connection) {
  var name = connection.name;

  return _ramda2.default.assoc('name', name.replace(/\s/g, '-'), connection);
}

function prepareConnection(type) {
  return _ramda2.default.equals('update', type) ? filterForUpdate : _ramda2.default.compose(filterFields, joinNameWhitespace, _transformUuidName.combineUuid);
}

exports.default = prepareConnection;
//# sourceMappingURL=prepareConnection.js.map