export default function removeRule(id) {
  return function remove(context) {
    const { client, say: { ok } } = context;
    const print = () => ok("Removed rule: ", id);

    print();

    // return client.rules.delete({ id })
    //   .then(print)
    //   .catch(apiErrorHandler("removing rule", { id }, context));
  }
}
