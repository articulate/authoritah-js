'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatDiff;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _formatters = require('./formatters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formatters = {
  adds: _ramda2.default.map((0, _formatters.formatAdd)(0)),
  removes: _ramda2.default.map((0, _formatters.formatRemove)(0)),
  changes: _ramda2.default.map((0, _formatters.formatChange)(0))
};

function formatDiff(context) {
  var diff = context.diff;

  var buffer = "";

  _ramda2.default.mapObjIndexed(function (diffs, name) {
    buffer += ' ' + name + ':\n';
    buffer += _ramda2.default.compose(_ramda2.default.join('\n'), _ramda2.default.values, _ramda2.default.evolve(formatters), _ramda2.default.reject(_ramda2.default.isEmpty))(diffs);
    buffer += '\n';
    return buffer;
  }, diff);

  return buffer;
}