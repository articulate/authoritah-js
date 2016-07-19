'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeRules;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _apiCallWrapper = require('../../utils/apiCallWrapper');

var _apiCallWrapper2 = _interopRequireDefault(_apiCallWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeRules(context) {
  var removes = context.diff.rules.removes;

  var removeFn = (0, _apiCallWrapper2.default)('rules.delete', context);

  return Promise.all(_ramda2.default.map(removeFn, removes)).then(function (_) {
    return context;
  });
}
//# sourceMappingURL=removeRules.js.map