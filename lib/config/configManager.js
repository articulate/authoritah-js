'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configManager;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_FILE = ".authoritah.json";

function _read(configFile) {
  try {
    var raw = _fs2.default.readFileSync(configFile);
    return JSON.parse(raw);
  } catch (e) {
    //console.warn(`File ${configFile} not found.`);
    return {};
  }
}

function _finalize(config, configFile) {
  var encoded = JSON.stringify(config, null, 2);

  _fs2.default.writeFileSync(configFile, encoded);
  return config;
}

function configManager() {
  var path = arguments.length <= 0 || arguments[0] === undefined ? DEFAULT_FILE : arguments[0];

  var config = _read(path);

  var set = function set(key, value) {
    config[key] = value;

    _finalize(config, path);
    return value;
  };

  return {
    config: config,
    set: set,
    get: function get(key) {
      var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

      return _ramda2.default.defaultTo(defaultValue, config[key]);
    },
    gets: function gets() {
      for (var _len = arguments.length, keymap = Array(_len), _key = 0; _key < _len; _key++) {
        keymap[_key] = arguments[_key];
      }

      return _ramda2.default.pick(keymap, config);
    },
    orGet: function orGet(key, primaryValue) {
      return _ramda2.default.defaultTo(config[key], primaryValue);
    },
    getsd: function getsd(defaultMap) {
      return _ramda2.default.mergeWith(_ramda2.default.defaultTo, defaultMap, _ramda2.default.pick(_ramda2.default.keys(defaultMap), config));
    },
    print: function print() {
      for (var key in config) {
        console.log(key + '=' + config[key]);
      }
    },
    sets: function sets(obj) {
      config = _ramda2.default.merge(config, obj);
      return _finalize(config, path);
    },
    getset: function getset(key, defaultValue) {
      var value = config[key];
      if (_ramda2.default.isNil(value)) {
        value = set(key, defaultValue);
      }

      return value;
    },
    remove: function remove() {
      for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        keys[_key2] = arguments[_key2];
      }

      keys.forEach(function (key) {
        delete config[key];
      });

      return _finalize(config, path);
    }
  };
}
//# sourceMappingURL=configManager.js.map