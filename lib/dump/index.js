'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _loadEnv = require('../utils/loadEnv');

var _loadEnv2 = _interopRequireDefault(_loadEnv);

var _setupClient = require('../utils/setupClient');

var _setupClient2 = _interopRequireDefault(_setupClient);

var _say2 = require('../utils/say');

var _say3 = _interopRequireDefault(_say2);

var _fetchRules = require('../auth0/fetchRules');

var _fetchRules2 = _interopRequireDefault(_fetchRules);

var _fetchConnections = require('../auth0/fetchConnections');

var _fetchConnections2 = _interopRequireDefault(_fetchConnections);

var _saveRules = require('./saveRules');

var _saveRules2 = _interopRequireDefault(_saveRules);

var _saveConnections = require('./saveConnections');

var _saveConnections2 = _interopRequireDefault(_saveConnections);

var _saveManifest = require('./saveManifest');

var _saveManifest2 = _interopRequireDefault(_saveManifest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index(filePath, options) {
  var format = options.format;

  var _say = (0, _say3.default)(options);

  var error = _say.error;
  var ok = _say.ok;


  var ext = format == "json" ? "json" : "yml";
  var filename = filePath ? filePath : 'auth0.' + ext;

  return (0, _loadEnv2.default)(options).then(_setupClient2.default).then(_fetchRules2.default).then(_fetchConnections2.default).then(_saveRules2.default).then(_saveConnections2.default).then((0, _saveManifest2.default)(filename)).then(ok('Manifest written to ' + filename)).catch(error);
}
//# sourceMappingURL=index.js.map