export default function apiCallWrapper(fn, context) {
  const { say: { error } } = context;
  return (...args) => fn(...args)
    .catch(err => {
      error("Problem calling API: ", err.message, ' ', args)
      return Promise.reject(err);
    });
}
