'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// additional fields we can't or don't pass during an update
var filterFields = _ramda2.default.omit(['id', 'name', 'strategy']);
var prepareConnectionForUpdate = _ramda2.default.compose(filterFields, _ramda2.default.head);
exports.default = prepareConnectionForUpdate;