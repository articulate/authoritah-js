'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = saveConnections;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _saveScripts = require('../utils/saveScripts');

var _saveScripts2 = _interopRequireDefault(_saveScripts);

var _objectManipulation = require('../transformers/objectManipulation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ruleLens = _ramda2.default.lensPath(['options', 'customScripts']);

var transformForSave = function transformForSave(saveFn) {
  return _ramda2.default.over(ruleLens, _ramda2.default.compose(_ramda2.default.map(saveFn), (0, _objectManipulation.expandObject)('name', 'script')));
};
var transformForWrite = _ramda2.default.over(ruleLens, (0, _objectManipulation.combineObject)('name', 'script'));

function saveConnections(context) {
  var connections = context.connections;
  var connectionScripts = context.options.connectionScripts;


  var saveAndWrite = _ramda2.default.map(function (connection) {
    var name = connection.name;
    var customScripts = connection.options.customScripts;

    if (_ramda2.default.isNil(customScripts)) {
      return connection;
    }

    var saveScriptTo = (0, _saveScripts2.default)(connectionScripts + '/' + name);
    return _ramda2.default.compose(transformForWrite, transformForSave(saveScriptTo))(connection);
  });

  return _ramda2.default.assoc('connections', saveAndWrite(connections), context);
}
//# sourceMappingURL=saveConnections.js.map