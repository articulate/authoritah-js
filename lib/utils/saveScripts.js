'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveScripts;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scriptName = function scriptName(name) {
  return name.toLowerCase().replace(/\s/g, "_");
};

// Constructs a function that saves a given script definition
// (form of `{ script, name }`) to a file
function saveScripts(dir) {
  _fsExtra2.default.ensureDirSync(dir);

  return function (scriptDefn) {
    var script = scriptDefn.script;
    var name = scriptDefn.name;

    var path = dir + '/' + scriptName(name) + '.js';

    _fsExtra2.default.writeFileSync(path, script);
    return _ramda2.default.assoc('script', path, scriptDefn);
  };
}
//# sourceMappingURL=saveScripts.js.map