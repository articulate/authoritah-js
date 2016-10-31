import R from 'ramda'
import loadEnv from '../utils/loadEnv'
import say from '../utils/say'

const configActions = {
  set(args, context) {
    const { config } = context;

    args.forEach(setting => {
      let [key, val] = setting.split('=');
      config.set(key, val);
    });
  },

  get(args, context) {
    const { config, say: { say } } = context;

    if(args.length == 1) {
      say(config.get(args[0]));
    } else {
      args.forEach(key => {
        const value = config.get(key);
        say(`${key}=${value}`);
      });
    }
  },

  rm(args, context) {
    const { config } = context;
    config.remove(args);
  },

  ls(_args, context) {
    const { config } = context;
    config.print();
  },
};

export default function index(command, args, options) {
  const action = configActions[command];
  const { error } = say(options);

  return loadEnv(options)
    .then(R.partial(action, [args]))
    .catch(error);
}
