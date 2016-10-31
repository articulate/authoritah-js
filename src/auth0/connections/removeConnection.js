export default function removeConnection(id) {
  return function remove(context) {
    const { client, say: { ok } } = context;
    const print = () => ok("Removed connection: ", id);

    print();

    // return client.connections.delete({ id })
    //   .then(print)
    //   .catch(apiErrorHandler("removing connection", { id }, context));
  }
}
