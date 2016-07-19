'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = apiCallWrapper;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _inflect = require('inflect');

var _inflect2 = _interopRequireDefault(_inflect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endsWith = _ramda2.default.curry(function (ending, str) {
  return str.endsWith(ending);
});
var append = _ramda2.default.flip(_ramda2.default.concat);
var pastTense = _ramda2.default.ifElse(endsWith('e'), append('d'), append('ed'));

var printDryRun = function printDryRun(action, type, printer, args) {
  return Promise.resolve(printer(_inflect2.default.capitalize(action) + ' ' + _inflect2.default.singularize(type) + ': ', args));
};

var printResult = function printResult(action, type, printer) {
  return function (_ref) {
    var name = _ref.name;
    return printer(_inflect2.default.capitalize(pastTense(action)) + ' ' + type + ' ' + name);
  };
};

var actions = {
  delete: function _delete(fn, obj) {
    return _ramda2.default.compose(_ramda2.default.composeP(_ramda2.default.always(obj), fn), _ramda2.default.pick(['id']))(obj);
  },
  create: _ramda2.default.call,
  update: function update(fn, obj) {
    return fn(_ramda2.default.pick(['id'], obj), _ramda2.default.omit(['id'], obj));
  }
};

function apiCallWrapper(fnPath, context) {
  var client = context.client;
  var _context$say = context.say;
  var error = _context$say.error;
  var ok = _context$say.ok;
  var notice = _context$say.notice;
  var dryRun = context.options.dryRun;

  var _R$split = _ramda2.default.split('.', fnPath);

  var _R$split2 = _slicedToArray(_R$split, 2);

  var type = _R$split2[0];
  var action = _R$split2[1];
  var apiFn = client[type][action];

  var printer = { delete: error, create: ok, update: notice }[action];

  return function (obj) {
    return _ramda2.default.equals(true, dryRun) ? printDryRun(action, type, printer, obj) : actions[action](apiFn, obj).then(printResult(action, type, printer)).catch(function (err) {
      error("Problem calling API: ", err.message, ' ', obj);
      return Promise.reject(err);
    });
  };
}
//# sourceMappingURL=apiCallWrapper.js.map