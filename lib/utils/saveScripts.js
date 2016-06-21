'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveScripts;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scriptName = function scriptName(name) {
  return name.toLowerCase().replace(/\s/g, "_");
};

function ensureScriptDir(dir) {
  try {
    _fs2.default.mkdirSync(dir);
  } catch (e) {
    // ignore
  }
}

// Constructs a function that saves a given script definition
// (form of `{ script, name }`) to a file
function saveScripts(dir) {
  ensureScriptDir(dir);

  return function (scriptDefn) {
    var script = scriptDefn.script;
    var name = scriptDefn.name;

    var path = dir + '/' + scriptName(name) + '.js';

    _fs2.default.writeFileSync(path, script);
    return _ramda2.default.compose(_ramda2.default.assoc('script_file', path), _ramda2.default.dissoc('script'))(scriptDefn);
  };
}
//# sourceMappingURL=saveScripts.js.map