'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareForUpdate = exports.prepareForCreate = undefined;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterFields = _ramda2.default.pick(['name', 'script', 'enabled', 'stage', 'order']);

var prepareForCreate = exports.prepareForCreate = _ramda2.default.compose(filterFields, _transformUuidName.combineUuid);
var prepareForUpdate = exports.prepareForUpdate = _ramda2.default.compose(_ramda2.default.omit(['stage']), prepareForCreate);
//# sourceMappingURL=prepareRule.js.map