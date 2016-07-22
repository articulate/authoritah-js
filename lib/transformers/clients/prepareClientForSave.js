'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prepareClientForSave = _ramda2.default.pick(['name']);
exports.default = prepareClientForSave;
//# sourceMappingURL=prepareClientForSave.js.map