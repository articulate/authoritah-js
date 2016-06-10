'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadEnv;

var _configManager = require('../config/configManager');

var _configManager2 = _interopRequireDefault(_configManager);

var _say = require('./say');

var _say2 = _interopRequireDefault(_say);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadEnv(options) {
  return Promise.resolve({ config: (0, _configManager2.default)(), options: options, say: (0, _say2.default)(options) });
}
//# sourceMappingURL=loadEnv.js.map