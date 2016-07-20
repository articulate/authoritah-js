export default function apiErrorHandler(obj, actionDesc, context) {
  const { say: { error } } = context;

  return function(err) {
    error(`Problem ${actionDesc}: `, err.message, ' ', obj);
    process.exit(1);
  }
}
