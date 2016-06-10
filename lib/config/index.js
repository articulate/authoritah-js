'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = index;

var _ramda = require('ramda');

var _loadEnv = require('../utils/loadEnv');

var _loadEnv2 = _interopRequireDefault(_loadEnv);

var _say2 = require('../utils/say');

var _say3 = _interopRequireDefault(_say2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configActions = {
  set: function set(args, context) {
    var config = context.config;


    args.forEach(function (setting) {
      var _setting$split = setting.split('=');

      var _setting$split2 = _slicedToArray(_setting$split, 2);

      var key = _setting$split2[0];
      var val = _setting$split2[1];

      config.set(key, val);
    });
  },
  get: function get(args, context) {
    var config = context.config;
    var say = context.say.say;


    if (args.length == 1) {
      say(config.get(args[0]));
    } else {
      args.forEach(function (key) {
        var value = config.get(key);
        say(key + '=' + value);
      });
    }
  },
  rm: function rm(args, config) {
    config.remove(args);
  },
  print: function print(args, config) {
    config.print();
  }
};

function index(command, args, options) {
  var action = configActions[command];

  var _say = (0, _say3.default)(options);

  var error = _say.error;


  return (0, _loadEnv2.default)(options).then((0, _ramda.partial)(action, [args])).catch(error);
}
//# sourceMappingURL=index.js.map