"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = promisify;
// Wraps a function that takes a callback with the signature `function (error, response)`
// in a Promise that rejects when `error` is present or resolves with the result of the callback
function promisify(fn) {
  var context = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

  var boundFn = fn.bind(context);

  return function (data) {
    return new Promise(function (resolve, reject) {
      boundFn(data, function (err, resp) {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      });
    });
  };
}
//# sourceMappingURL=promisify.js.map