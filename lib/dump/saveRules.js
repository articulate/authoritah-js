'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _saveScripts = require('../utils/saveScripts');

var _saveScripts2 = _interopRequireDefault(_saveScripts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function saveRules(context) {
  var rules = context.rules,
      ruleScripts = context.options.ruleScripts;

  var saveScriptTo = (0, _saveScripts2.default)(ruleScripts);

  var prepare = _ramda2.default.compose(_ramda2.default.sortBy(_ramda2.default.prop('order')), _ramda2.default.map(saveScriptTo));

  return _ramda2.default.assoc('rules', prepare(rules), context);
}