'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../transformers/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MAX_NAME_SIZE = 18;

// helpers for name formatting conventions
var dropUUID = _ramda2.default.dissoc('uuid');
var filterCreateFields = _ramda2.default.omit([]);

var prepareForCreate = _ramda2.default.compose(filterCreateFields, dropUUID);

exports.default = prepareForCreate;
//# sourceMappingURL=prepareConnectionForCreate.js.map