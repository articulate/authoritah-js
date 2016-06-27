'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = index;

var _loadEnv = require('../utils/loadEnv');

var _loadEnv2 = _interopRequireDefault(_loadEnv);

var _say2 = require('../utils/say');

var _say3 = _interopRequireDefault(_say2);

var _loadManifest = require('../apply/loadManifest');

var _loadManifest2 = _interopRequireDefault(_loadManifest);

var _setupClient = require('../utils/setupClient');

var _setupClient2 = _interopRequireDefault(_setupClient);

var _fetchRules = require('../auth0/fetchRules');

var _fetchRules2 = _interopRequireDefault(_fetchRules);

var _fetchConnections = require('../auth0/fetchConnections');

var _fetchConnections2 = _interopRequireDefault(_fetchConnections);

var _diff = require('./diff');

var _diff2 = _interopRequireDefault(_diff);

var _addRules = require('../auth0/addRules');

var _addRules2 = _interopRequireDefault(_addRules);

var _updateRules = require('../auth0/updateRules');

var _updateRules2 = _interopRequireDefault(_updateRules);

var _removeRules = require('../auth0/removeRules');

var _removeRules2 = _interopRequireDefault(_removeRules);

var _addConnections = require('../auth0/addConnections');

var _addConnections2 = _interopRequireDefault(_addConnections);

var _updateConnections = require('../auth0/updateConnections');

var _updateConnections2 = _interopRequireDefault(_updateConnections);

var _removeConnections = require('../auth0/removeConnections');

var _removeConnections2 = _interopRequireDefault(_removeConnections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function index() {
  var filename = arguments.length <= 0 || arguments[0] === undefined ? './auth0.yml' : arguments[0];
  var options = arguments[1];

  var _say = (0, _say3.default)(options);

  var error = _say.error;


  return (0, _loadEnv2.default)(options).then((0, _loadManifest2.default)(filename)).then(_setupClient2.default).then(_fetchRules2.default).then(_fetchConnections2.default).then((0, _diff2.default)('rules')).then((0, _diff2.default)('connections')).then(_removeRules2.default).then(_updateRules2.default).then(_addRules2.default).then(_removeConnections2.default).then(_updateConnections2.default).then(_addConnections2.default).catch(error);
}
//# sourceMappingURL=index.js.map