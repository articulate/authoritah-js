'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.extractUuid = extractUuid;
exports.combineUuid = combineUuid;

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _idgen = require('idgen');

var _idgen2 = _interopRequireDefault(_idgen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// includes legacy UUID format matcher
var uuidMatcher = /^([\w]{8}(?:-[\w]{4}){3}-[\w]{12}|[\w-_]{16})[ -](.+)$/;

// ensure no underscores as Auth0 has some limitations on name conventions
var sanitizedId = function sanitizedId() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return (0, _idgen2.default)(args).replace(/_/g, '-');
};

function extractUuid(attrs) {
  var name = attrs.name;

  var _R$match = _ramda2.default.match(uuidMatcher, name);

  var _R$match2 = _slicedToArray(_R$match, 3);

  var _original = _R$match2[0];
  var uuid = _R$match2[1];
  var namePart = _R$match2[2];


  if (_ramda2.default.isNil(uuid)) {
    uuid = sanitizedId(16);
    namePart = name;
  }

  return _ramda2.default.merge(attrs, { uuid: uuid, name: namePart });
}

function combineUuid(attrs) {
  var name = attrs.name;
  var uuid = attrs.uuid;


  if (_ramda2.default.isNil(uuid)) {
    uuid = sanitizedId(16);
  }

  return _ramda2.default.compose(_ramda2.default.assoc('name', uuid + ' ' + name), _ramda2.default.dissoc('uuid'))(attrs);
}
//# sourceMappingURL=transformUuidName.js.map