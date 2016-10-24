import R from 'ramda'
import { formatAdd, formatRemove, formatChange } from './formatters'

const formatters = {
  adds: R.map(formatAdd(0)),
  removes: R.map(formatRemove(0)),
  changes: R.map(formatChange(0)),
};

export default function formatDiff(context) {
  const { diff } = context;
  var buffer = "";

  R.mapObjIndexed((diffs, name) => {
    buffer += ` ${name}:\n`;
    buffer += R.compose(R.join('\n'), R.values, R.evolve(formatters), R.reject(R.isEmpty))(diffs);
    buffer += '\n';
    return buffer;
  }, diff);

  return buffer;
}
