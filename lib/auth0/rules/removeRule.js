"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeRule;
function removeRule(id) {
  return function remove(context) {
    var client = context.client;
    var ok = context.say.ok;

    var print = function print() {
      return ok("Removed rule: ", id);
    };

    print();

    // return client.rules.delete({ id })
    //   .then(print)
    //   .catch(apiErrorHandler("removing rule", { id }, context));
  };
}