'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filterNulls = _ramda2.default.filter(_ramda2.default.compose(_ramda2.default.not, _ramda2.default.isNil));
var ignoreFields = _ramda2.default.omit(['client_id', 'callback_url_template', 'tenant', 'global', 'config_route', 'owners']);
var prepareClientForUpdate = _ramda2.default.compose(filterNulls, ignoreFields);

exports.default = prepareClientForUpdate;
//# sourceMappingURL=prepareClientForUpdate.js.map