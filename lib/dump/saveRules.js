'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveRules;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scriptName = function scriptName(name) {
  return name.toLowerCase().replace(/\s/g, "_");
};

function saveScript(dir, rule) {
  var script = rule.script;
  var name = rule.name;

  var path = dir + '/' + scriptName(name) + '.js';

  _fs2.default.writeFileSync(path, script);
  return _ramda2.default.compose(_ramda2.default.assoc('script_file', path), _ramda2.default.dissoc('script'))(rule);
}

function ensureScriptDir(dir) {
  try {
    _fs2.default.mkdirSync(dir);
  } catch (e) {
    // ignore
  }
}

var formatter = _ramda2.default.ifElse(_ramda2.default.equals('json'), _ramda2.default.always(_ramda2.default.curry(JSON.stringify)(_ramda2.default.__, null, 2)), _ramda2.default.always(_jsYaml2.default.dump));

function saveRules(filename) {
  return function (context) {
    var rules = context.rules;
    var _context$options = context.options;
    var format = _context$options.format;
    var scripts = _context$options.scripts;

    var saveTo = _ramda2.default.partial(saveScript, [scripts]);
    var write = _ramda2.default.compose(_ramda2.default.partial(_fs2.default.writeFileSync, [filename]), formatter(format));

    ensureScriptDir(scripts);

    return _ramda2.default.compose(write, _ramda2.default.map(saveTo))(rules);
  };
}
//# sourceMappingURL=saveRules.js.map