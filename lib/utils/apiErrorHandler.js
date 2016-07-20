'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiErrorHandler;
function apiErrorHandler(obj, actionDesc, context) {
  var error = context.say.error;


  return function (err) {
    error('Problem ' + actionDesc + ': ', err.message, ' ', obj);
    process.exit(1);
  };
}
//# sourceMappingURL=apiErrorHandler.js.map