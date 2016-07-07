'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareForUpdate = exports.prepareForCreate = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_NAME_SIZE = 18;
var filterFields = _ramda2.default.pick(['options', 'name', 'strategy', 'enabled_clients']);
var filterUpdateFields = _ramda2.default.omit(['name', 'strategy']);
var nameLens = _ramda2.default.lensProp('name');

var truncateName = _ramda2.default.over(nameLens, _ramda2.default.take(MAX_NAME_SIZE));
var replaceWhitespace = _ramda2.default.over(nameLens, _ramda2.default.replace(/\s/g, '-'));

var prepareForCreate = exports.prepareForCreate = _ramda2.default.compose(filterFields, replaceWhitespace, _transformUuidName.combineUuid, truncateName);
var prepareForUpdate = exports.prepareForUpdate = _ramda2.default.compose(filterUpdateFields, prepareForCreate);
//# sourceMappingURL=prepareConnection.js.map