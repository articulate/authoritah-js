'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// helpers for name formatting conventions
var dropUUID = _ramda2.default.dissoc('uuid');
var prepareForCreate = dropUUID;

exports.default = prepareForCreate;
//# sourceMappingURL=prepareConnectionForCreate.js.map