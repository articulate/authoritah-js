'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var additions = _ramda2.default.differenceWith(_ramda2.default.eqProps('name'));
exports.default = additions;
//# sourceMappingURL=additions.js.map