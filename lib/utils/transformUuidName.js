'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformUuidName;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function transformUuidName(attrs) {
  var name = attrs.name;

  var _name$split = name.split(' ');

  var _name$split2 = _toArray(_name$split);

  var uuid = _name$split2[0];

  var nameParts = _name$split2.slice(1);

  return _ramda2.default.merge(attrs, { uuid: uuid, name: nameParts.join(' ') });
};
//# sourceMappingURL=transformUuidName.js.map