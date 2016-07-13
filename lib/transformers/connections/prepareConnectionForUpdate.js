'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _prepareConnectionForCreate = require('./prepareConnectionForCreate');

var _prepareConnectionForCreate2 = _interopRequireDefault(_prepareConnectionForCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// additional fields we can't or don't pass during an update
var filterUpdateFields = _ramda2.default.omit(['name', 'strategy']);
var prepareForUpdate = _ramda2.default.compose(filterUpdateFields, _prepareConnectionForCreate2.default);

exports.default = prepareForUpdate;
//# sourceMappingURL=prepareConnectionForUpdate.js.map