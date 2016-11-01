"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = removeConnection;
function removeConnection(id) {
  return function remove(context) {
    var client = context.client,
        ok = context.say.ok;

    var print = function print() {
      return ok("Removed connection: ", id);
    };

    print();

    // return client.connections.delete({ id })
    //   .then(print)
    //   .catch(apiErrorHandler("removing connection", { id }, context));
  };
}