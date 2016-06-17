import R from 'ramda'
import cl from 'cli-color'
import { inspect } from 'util'

const printers = {
  error: [ console.error, cl.red.bold ],
  warn: [ console.warn, cl.yellow.italic ],
  ok: [ console.log, cl.green ],
  notice: [ console.log, cl.cyan ],
  say: [ console.log ],
};

const colorlessInspector = (obj) => inspect(obj, { colors: false });
const doInspect = R.ifElse(R.is(String), R.identity, colorlessInspector);
const hydrate = (...msg) => R.compose(R.join(''), R.map(doInspect))(msg);

export default function say(options) {
  const color = R.pathOr(true, ['parent', 'color'], options);

  return R.map(([printer, fmt]) => {
    const boundPrint = printer.bind(console);

    if(!fmt) { return boundPrint; }

    return color ? R.compose(boundPrint, fmt, hydrate) : boundPrint;
  }, printers);
}
