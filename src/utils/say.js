import { map, always, compose, ifElse, pathOr, identity, is, join } from 'ramda'
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
const doInspect = ifElse(is(String), identity, colorlessInspector);
const hydrate = (...msg) => compose(join(''), map(doInspect))(msg);

export default function say(options) {
  const color = pathOr(true, ['parent', 'color'], options);

  return map(([printer, fmt]) => {
    const boundPrint = printer.bind(console);

    if(!fmt) { return boundPrint; }

    return color ? compose(boundPrint, fmt, hydrate) : boundPrint;
  }, printers);
}
