'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveConnections;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _saveScripts = require('../utils/saveScripts');

var _saveScripts2 = _interopRequireDefault(_saveScripts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleLens = _ramda2.default.lens(_ramda2.default.prop('customScripts'), _ramda2.default.assoc('customScripts'));
var transformForSave = _ramda2.default.compose(_ramda2.default.values, _ramda2.default.mapObjIndexed(function (script, name) {
  return { name: name, script: script };
}));
var transform = function transform(saveFn) {
  return _ramda2.default.over(ruleLens, _ramda2.default.compose(_ramda2.default.map(saveFn), transformForSave));
};

function saveConnections(context) {
  var connections = context.connections;
  var connectionScripts = context.options.connectionScripts;

  var saveScriptTo = (0, _saveScripts2.default)(connectionScripts);

  return _ramda2.default.assoc('connections', _ramda2.default.map(transform(saveScriptTo), connections), context);
  //return context;
}
//# sourceMappingURL=saveConnections.js.map