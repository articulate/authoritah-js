'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadScript(field, object) {
  var script_file = object[field];

  var script = _fs2.default.readFileSync(script_file).toString();

  return _ramda2.default.assoc(field, script, object);
}

exports.default = _ramda2.default.curry(loadScript);