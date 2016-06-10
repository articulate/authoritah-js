'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configManager;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_FILE = ".authoritah.json";

function _read(configFile) {
  try {
    var raw = _fs2.default.readFileSync(configFile);
    return JSON.parse(raw);
  } catch (e) {
    console.warn('File ' + configFile + ' not found.');
    return {};
  }
}

function _finalize(config, configFile) {
  var encoded = JSON.stringify(config, null, 2);

  _fs2.default.writeFileSync(configFile, encoded);
  return config;
}

function get(config, key) {
  var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? undefined : arguments[2];

  return (0, _ramda.defaultTo)(defaultValue, config[key]);
}

function gets(config) {
  for (var _len = arguments.length, keymap = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keymap[_key - 1] = arguments[_key];
  }

  return (0, _ramda.pick)(keymap, config);
}

function orGet(config, key, primaryValue) {
  return (0, _ramda.defaultTo)(config[key], primaryValue);
}

function getsd(config, defaultMap) {
  return (0, _ramda.mergeWith)(_ramda.defaultTo, defaultMap, (0, _ramda.pick)((0, _ramda.keys)(defaultMap), config));
}

function print(config) {
  for (var key in config) {
    console.log(key + '=' + config[key]);
  }
}

function configManager() {
  var path = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_FILE : arguments[0];

  var config = _read(path);

  function set(key, value) {
    config[key] = value;

    _finalize(config, path);
    return value;
  }

  function getset(key, defaultValue) {
    var value = config[key];
    if ((0, _ramda.isNil)(value)) {
      value = set(key, defaultValue);
    }

    return value;
  }

  function remove() {
    for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      keys[_key2] = arguments[_key2];
    }

    keys.forEach(function (key) {
      delete config[key];
    });

    return _finalize(config, path);
  }

  return {
    config: config,
    set: set,
    remove: remove,
    getset: getset,
    get: (0, _ramda.partial)(get, [config]),
    gets: (0, _ramda.partial)(gets, [config]),
    getsd: (0, _ramda.partial)(getsd, [config]),
    orGet: (0, _ramda.partial)(orGet, [config]),
    print: (0, _ramda.partial)(print, [config])
  };
}
//# sourceMappingURL=configManager.js.map