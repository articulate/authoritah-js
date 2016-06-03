import { map, always, compose, ifElse } from 'ramda'
import cl from 'cli-color'

const printers = {
  error: [ console.error, cl.red.bold ],
  warn: [ console.warn, cl.yellow.italics ],
  ok: [ console.log, cl.green ],
  notice: [ console.log, cl.cyan ],
  say: [ console.log ],
};

export default function say(options) {
  const { parent: { color } } = options;

  return map(defn => {
    let [printer, fmt] = defn;
    printer = printer.bind(console);

    if(!fmt) { return printer; }

    return ifElse(always(color),
                  compose(printer, fmt),
                  printer);
  }, printers);
}
