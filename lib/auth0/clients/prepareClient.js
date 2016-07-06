'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _transformUuidName = require('../../utils/transformUuidName');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ignoreFields = _ramda2.default.omit(['client_id']);
var prepareClient = _ramda2.default.compose(ignoreFields, _transformUuidName.combineUuid);

exports.default = prepareClient;
//# sourceMappingURL=prepareClient.js.map