"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiCallWrapper;
function apiCallWrapper(fn, context) {
  var error = context.say.error;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(undefined, args).catch(function (err) {
      error("Problem calling API: ", err.message, ' ', args);
      return Promise.reject(err);
    });
  };
}
//# sourceMappingURL=apiCallWrapper.js.map