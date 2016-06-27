'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function joinNameWhitespace(connection) {
  var name = connection.name;

  return _ramda2.default.assoc('name', name.replace(' ', '-'), connection);
}

var prepareConnection = _ramda2.default.compose(joinNameWhitespace, _transformUuidName.combineUuid);

exports.default = prepareConnection;
//# sourceMappingURL=prepareConnection.js.map